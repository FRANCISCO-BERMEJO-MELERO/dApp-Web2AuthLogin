import { useState } from "react";
import { createBundlerClient } from "viem/account-abstraction";
import { http, parseEther } from "viem";
import { publicClient } from "../client";
import { getPimlicoGasPrice } from "../services/pimlico";

export const useBundler = () => {
    const [sending, setSending] = useState<boolean>(false);
    const [bundlerError, setBundlerError] = useState<string | null>(null);
    const [userOpHash, setUserOpHash] = useState<string>("");

    const BUNDLER_RPC = import.meta.env.VITE_BUNDLER_RPC;
    const DUMMY_RECIPIENT = import.meta.env.VITE_DUMMY_RECIPIENT;

    if (!BUNDLER_RPC) {
        throw new Error("VITE_BUNDLER_RPC is not defined in environment variables.");
    }
    if (!DUMMY_RECIPIENT) {
        throw new Error("VITE_DUMMY_RECIPIENT is not defined in environment variables.");
    }

    const sendUserOperation = async (
        smartAccountInstance: any,
        webAuthnAccount: any
    ) => {
        if (!smartAccountInstance || !webAuthnAccount) return;

        try {
            setSending(true);
            setBundlerError(null);

            const bundlerClient = createBundlerClient({
                client: publicClient,
                transport: http(BUNDLER_RPC),
            });

            const { maxFeePerGas, maxPriorityFeePerGas } = await getPimlicoGasPrice();

            // 1️⃣ Preparar la UserOperation
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

            console.log("User operation hash:", userOp);
            setUserOpHash(userOp);
            setSending(false);
            return userOp;
        } catch (err: any) {
            setBundlerError(err.message || "Error sending user operation");
            setSending(false);
        }
    };

    return {
        sendUserOperation,
        sending,
        bundlerError,
        userOpHash,
    };
};
