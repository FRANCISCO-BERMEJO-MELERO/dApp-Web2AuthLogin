import { useSmartAccount } from "../../hooks/useSmartAccount";
import { useBundler } from "../../hooks/useBundler";
import { LoadingView } from "./LoadingView";
import { AccountCreatedView } from "./AccountCreatedView";
import { DeployAccountView } from "./DeployAccountView";

interface CreateSmartAccountProps {
    userId: string;
}

export const CreateSmartAccount = ({ userId }: CreateSmartAccountProps) => {
    const {
        smartAccountAddress,
        smartAccountInstance,
        loading,
        deploying,
        error: accountError,
        isDeployed,
        txHash,
        deployAccount,
        webAuthnAccount,
        createAccount,
    } = useSmartAccount(userId);

    const {
        sendUserOperation,
        sending,
        bundlerError,
        userOpHash,
    } = useBundler();

    const handleDeployAccount = async () => {
        await deployAccount();
    };

    const handleSendTransaction = async () => {
        await sendUserOperation(smartAccountInstance, webAuthnAccount);
    };

    const error = accountError || bundlerError;

    if (loading) {
        return <LoadingView />;
    }

    if (isDeployed) {
        return (
            <AccountCreatedView
                smartAccountAddress={smartAccountAddress}
                txHash={txHash}
                sending={sending}
                onSend={handleSendTransaction}
                userOpHash={userOpHash}
            />
        );
    }

    return (
        <div className="glass-panel p-10 rounded-[2rem] max-w-lg w-full mx-auto space-y-10 border border-white/10 shadow-2xl shadow-black/20">
            <div className="text-center space-y-4">
                <h2 className="text-4xl font-bold tracking-tight text-white">
                    {smartAccountAddress ? "Deploy Account" : "Create Account"}
                </h2>
                <p className="text-slate-400 text-base leading-relaxed max-w-sm mx-auto">
                    {smartAccountAddress
                        ? "Your smart account address is ready. Deploy it to the network to start using it."
                        : "Create a new smart account secured by your passkey."}
                </p>
                {!smartAccountAddress && (
                    <button
                        onClick={createAccount}
                        className="mt-4 px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold shadow-lg shadow-blue-500/20 transition-all"
                    >
                        Create Passkey
                    </button>
                )}
            </div >

            <div className="space-y-6">
                {smartAccountAddress && !isDeployed && (
                    <DeployAccountView
                        smartAccountAddress={smartAccountAddress}
                        deploying={deploying}
                        onDeploy={handleDeployAccount}
                    />
                )}

                {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center animate-fade-in">
                        {error}
                    </div>
                )}
            </div>
        </div >
    );
};
