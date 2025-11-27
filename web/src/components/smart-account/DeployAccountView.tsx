interface DeployAccountViewProps {
    smartAccountAddress: string;
    deploying: boolean;
    onDeploy: () => void;
}

export const DeployAccountView = ({ smartAccountAddress, deploying, onDeploy }: DeployAccountViewProps) => (
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

        <button
            onClick={onDeploy}
            disabled={deploying}
            className="w-full btn-primary py-4 px-6 rounded-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed text-lg font-bold shadow-lg shadow-blue-500/20"
        >
            {deploying ? (
                <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Deploying...
                </>
            ) : (
                "Deploy to Sepolia"
            )}
        </button>
    </div>
);
