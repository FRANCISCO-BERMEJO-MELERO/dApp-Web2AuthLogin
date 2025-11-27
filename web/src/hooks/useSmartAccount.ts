import { useState, useEffect } from "react";
import { publicClient } from "../client";
import { createWebAuthnCredential, toWebAuthnAccount, type WebAuthnAccount } from "viem/account-abstraction";
import { Implementation, toMetaMaskSmartAccount, type MetaMaskSmartAccount } from "@metamask/smart-accounts-kit";
import { Address, PublicKey } from "ox";
import { toHex, createWalletClient, http, keccak256, stringToHex } from "viem";
import { sepolia as chain } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import { getCredential, saveCredential } from "../utils/storage";

export const useSmartAccount = (userId: string) => {
    const [smartAccountAddress, setSmartAccountAddress] = useState<string>("");
    const [smartAccountInstance, setSmartAccountInstance] = useState<MetaMaskSmartAccount | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [deploying, setDeploying] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isDeployed, setIsDeployed] = useState<boolean>(false);
    const [isCreated, setIsCreated] = useState<boolean>(false);
    const [txHash, setTxHash] = useState<string>("");
    const [webAuthnAccount, setWebAuthnAccount] = useState<WebAuthnAccount | null>(null);

    const deploySalt = keccak256(stringToHex(userId));

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

            console.log("Smart account created:", smartAccount);
            console.log("Smart account address:", await smartAccount.getAddress());
            console.log("Smart account instance:", userId);
            const address = await smartAccount.getAddress();
            setSmartAccountAddress(address);
            setSmartAccountInstance(smartAccount);

            const code = await publicClient.getCode({ address });
            console.log("Smart account code:", code);
            if (code === undefined || code === "0x") {
                console.log("Smart account no desplegada aún");
            } else {
                console.log("Smart account ya existe");
                setIsDeployed(true);
            }
        } catch (err: any) {
            console.error("Error connecting with credential:", err);
            setError(err.message || "Error connecting with credential");
        }
    };

    useEffect(() => {
        setSmartAccountAddress("");
        setSmartAccountInstance(null);
        setIsDeployed(false);
        setIsCreated(false);
        setWebAuthnAccount(null);
        setTxHash("");
        setError(null);

        if (!userId) {
            setLoading(false);
            return;
        }

        const initAccount = async () => {
            try {
                setLoading(true);

                const credentialKey = `credential-${userId}`;
                const savedCredential = getCredential(credentialKey);

                if (savedCredential) {
                    await connectWithCredential(savedCredential);
                }

                setLoading(false);
            } catch (err: any) {
                setError(err.message || "Error initializing smart account");
                setLoading(false);
            }
        };

        initAccount();
    }, [userId]);

    const createAccount = async () => {
        try {
            setLoading(true);
            setError(null);

            const credential = await createWebAuthnCredential({ name: `${userId}` });
            const credentialKey = `credential-${userId}`;
            saveCredential(credentialKey, credential);

            await connectWithCredential(credential);
            setLoading(false);
        } catch (err: any) {
            console.error("Error creating smart account:", err);
            setError(err.message || "Error creating smart account");
            setLoading(false);
        }
    };

    const deployAccount = async () => {
        if (!smartAccountInstance) return;
        try {
            setDeploying(true);
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
            console.log("Smart account deployed, txHash:", hash);
            setDeploying(false);
            setIsCreated(true);
            setIsDeployed(true);
        } catch (err: any) {
            setError(err.message || "Error deploying smart account");
            setDeploying(false);
        }
    };

    return {
        smartAccountAddress,
        smartAccountInstance,
        loading,
        deploying,
        error,
        isDeployed,
        isCreated,
        txHash,
        deployAccount,
        webAuthnAccount,
        createAccount,
    };
};
