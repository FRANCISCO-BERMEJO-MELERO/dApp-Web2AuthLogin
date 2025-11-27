import { useState, useEffect } from "react";
import { publicClient } from "../client";
import { createWebAuthnCredential, toWebAuthnAccount, type WebAuthnAccount } from "viem/account-abstraction";
import { Implementation, toMetaMaskSmartAccount, type MetaMaskSmartAccount } from "@metamask/smart-accounts-kit";
import { Address, PublicKey } from "ox";
import { toHex, createWalletClient, http, keccak256, stringToHex, parseEther } from "viem";
import { sepolia as chain } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import { getCredential, saveCredential } from "../utils/storage";
import { createBundlerClient } from "viem/account-abstraction";
import { getPimlicoGasPrice } from "../services/pimlico";

export type SmartAccountStatus =
    | 'idle'
    | 'loading'
    | 'ready_to_deploy'
    | 'deploying'
    | 'deployed'
    | 'sending_transaction'
    | 'transaction_sent'
    | 'error';

export const useSmartAccount = (userId: string) => {
    const [status, setStatus] = useState<SmartAccountStatus>('idle');
    const [smartAccountAddress, setSmartAccountAddress] = useState<string>("");
    const [smartAccountInstance, setSmartAccountInstance] = useState<MetaMaskSmartAccount | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [txHash, setTxHash] = useState<string>("");
    const [userOpHash, setUserOpHash] = useState<string>("");
    const [webAuthnAccount, setWebAuthnAccount] = useState<WebAuthnAccount | null>(null);

    const deploySalt = keccak256(stringToHex(userId));
    const BUNDLER_RPC = import.meta.env.VITE_BUNDLER_RPC;
    const DUMMY_RECIPIENT = import.meta.env.VITE_DUMMY_RECIPIENT;

    // Helper to update status and error safely
    const setStatusError = (msg: string) => {
        setError(msg);
        setStatus('error');
    };

    const connectWithCredential = async (credential: any) => {
        try {
            const account = toWebAuthnAccount({ credential });
            setWebAuthnAccount(account);

            const publicKey = PublicKey.fromHex(credential.publicKey);
            const owner = Address.fromPublicKey(publicKey);

            const smartAccount = await toMetaMaskSmartAccount({
                client: publicClient,
                implementation: Implementation.Hybrid,
                deployParams: [
                    owner,
                    [toHex(credential.id)],
                    [publicKey.x],
                    [publicKey.y],
                ],
                deploySalt,
                signer: { webAuthnAccount: account, keyId: toHex(credential.id) },
            });

            const address = await smartAccount.getAddress();
            setSmartAccountAddress(address);
            setSmartAccountInstance(smartAccount);

            // Check deployment status
            const code = await publicClient.getCode({ address });
            if (code && code !== "0x") {
                setStatus('deployed');
            } else {
                setStatus('ready_to_deploy');
            }
        } catch (err: any) {
            console.error("Error connecting with credential:", err);
            setStatusError(err.message || "Error connecting with credential");
        }
    };

    // Initialize account on mount or userId change
    useEffect(() => {
        // Reset state
        setStatus('idle');
        setSmartAccountAddress("");
        setSmartAccountInstance(null);
        setWebAuthnAccount(null);
        setTxHash("");
        setUserOpHash("");
        setError(null);

        if (!userId) return;

        const initAccount = async () => {
            try {
                setStatus('loading');
                const credentialKey = `credential-${userId}`;
                const savedCredential = getCredential(credentialKey);

                if (savedCredential) {
                    await connectWithCredential(savedCredential);
                } else {
                    setStatus('idle'); // Ready to create
                }
            } catch (err: any) {
                setStatusError(err.message || "Error initializing smart account");
            }
        };

        initAccount();
    }, [userId]);

    const createAccount = async () => {
        try {
            setStatus('loading');
            setError(null);

            const credential = await createWebAuthnCredential({ name: `${userId}` });
            const credentialKey = `credential-${userId}`;
            saveCredential(credentialKey, credential);

            await connectWithCredential(credential);
        } catch (err: any) {
            console.error("Error creating smart account:", err);
            setStatusError(err.message || "Error creating smart account");
        }
    };

    const deployAccount = async () => {
        if (!smartAccountInstance) return;

        try {
            setStatus('deploying');
            setError(null);

            const relayAccount = privateKeyToAccount(import.meta.env.VITE_RELAY_PRIVATE_KEY as `0x${string}`);
            const walletClient = createWalletClient({
                account: relayAccount,
                chain,
                transport: http(),
            });

            const { factory, factoryData } = await smartAccountInstance.getFactoryArgs();

            const hash = await walletClient.sendTransaction({
                to: factory,
                data: factoryData,
            });

            setTxHash(hash);
            setStatus('deployed');
        } catch (err: any) {
            setStatusError(err.message || "Error deploying smart account");
        }
    };

    const sendTransaction = async () => {
        if (!smartAccountInstance || !webAuthnAccount) return;
        if (!BUNDLER_RPC || !DUMMY_RECIPIENT) {
            setStatusError("Missing environment variables for bundler");
            return;
        }

        try {
            setStatus('sending_transaction');
            setError(null);

            const bundlerClient = createBundlerClient({
                client: publicClient,
                transport: http(BUNDLER_RPC),
            });

            const { maxFeePerGas, maxPriorityFeePerGas } = await getPimlicoGasPrice();

            const userOp = await bundlerClient.sendUserOperation({
                account: smartAccountInstance,
                calls: [
                    {
                        to: DUMMY_RECIPIENT,
                        value: parseEther("0.0001"),
                    },
                ],
                maxFeePerGas,
                maxPriorityFeePerGas,
            });

            setUserOpHash(userOp);
            setStatus('transaction_sent');
        } catch (err: any) {
            setStatusError(err.message || "Error sending user operation");
        }
    };

    // Auto-deploy effect
    useEffect(() => {
        if (status === 'ready_to_deploy' && smartAccountInstance) {
            deployAccount();
        }
    }, [status, smartAccountInstance]);

    return {
        status,
        smartAccountAddress,
        smartAccountInstance,
        error,
        txHash,
        userOpHash,
        createAccount,
        deployAccount,
        sendTransaction,
    };
};
