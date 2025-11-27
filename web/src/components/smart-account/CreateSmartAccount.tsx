import { useSmartAccount } from "../../hooks/useSmartAccount";
import { AccountCreatedView } from "./AccountCreatedView";
import { useAccount } from "wagmi";

interface CreateSmartAccountProps {
    userId: string;
}

const LoadingView = () => (
    <div className="glass-panel p-12 rounded-[2rem] max-w-md w-full mx-auto text-center space-y-8 animate-fade-in border border-white/10 shadow-2xl shadow-black/20">
        <div className="flex justify-center relative">
            <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full animate-pulse-soft"></div>
            <svg className="animate-spin h-14 w-14 text-blue-400 relative z-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        </div>
        <div className="space-y-3">
            <h3 className="text-2xl font-bold text-white tracking-tight">Initializing Account...</h3>
            <p className="text-slate-400 text-base">Please wait while we set up your smart account.</p>
        </div>
    </div>
);

interface DeployAccountViewProps {
    smartAccountAddress: string;
}

const DeployAccountView = ({ smartAccountAddress }: DeployAccountViewProps) => (
    <div className="space-y-8 animate-fade-in">
        <div className="bg-slate-950/40 p-6 rounded-2xl border border-slate-800 relative group hover:border-slate-700 transition-colors">
            <div className="absolute top-3 right-3 flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
            </div>
            <p className="text-xs text-slate-500 mb-3 font-bold uppercase tracking-wider">Predicted Address</p>
            <p className="font-mono text-sm text-blue-400 break-all">{smartAccountAddress}</p>
        </div>
    </div>
);

export const CreateSmartAccount = ({ userId }: CreateSmartAccountProps) => {
    const {
        status,
        smartAccountAddress,
        error,
        txHash,
        userOpHash,
        createAccount,
        sendTransaction,
    } = useSmartAccount(userId);

    const { address } = useAccount();

    const handleSendTransaction = async () => {
        await sendTransaction();
    };

    if (status === 'loading') {
        return <LoadingView />;
    }

    if (status === 'deployed' || status === 'sending_transaction' || status === 'transaction_sent') {
        return (
            <AccountCreatedView
                smartAccountAddress={smartAccountAddress}
                txHash={txHash}
                sending={status === 'sending_transaction'}
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
                <p className="text-slate-400 text-base leading-relaxed max-w-sm mx-auto">
                    {address}
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
                {(status === 'ready_to_deploy' || status === 'deploying') && (
                    <DeployAccountView
                        smartAccountAddress={smartAccountAddress}
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
