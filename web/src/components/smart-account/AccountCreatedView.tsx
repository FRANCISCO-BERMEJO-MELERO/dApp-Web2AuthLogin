interface AccountCreatedViewProps {
    smartAccountAddress: string;
    txHash: string;
}

export const AccountCreatedView = ({ smartAccountAddress, txHash }: AccountCreatedViewProps) => (
    <div className="glass-panel p-10 rounded-[2rem] max-w-md w-full mx-auto text-center space-y-8 animate-fade-in border border-green-500/20 shadow-2xl shadow-green-900/20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50"></div>

        <div className="w-24 h-24 bg-green-500/10 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4 ring-1 ring-green-500/30 shadow-[0_0_30px_-5px_rgba(34,197,94,0.3)]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
        </div>

        <div className="space-y-3">
            <h3 className="text-3xl font-bold text-white tracking-tight">Smart Account Ready</h3>
            <p className="text-slate-400 text-base">Your account has been successfully deployed to Sepolia.</p>
        </div>

        <div className="bg-slate-950/40 p-6 rounded-2xl border border-slate-800 break-all group hover:border-slate-700 transition-colors text-left space-y-4">
            <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1.5 font-bold">Wallet Address</p>
                <p className="font-mono text-blue-400 text-sm bg-blue-500/5 p-2 rounded-lg border border-blue-500/10">{smartAccountAddress}</p>
            </div>
            <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1.5 font-bold">Transaction Hash</p>
                <p className="font-mono text-blue-400 text-sm bg-blue-500/5 p-2 rounded-lg border border-blue-500/10">{txHash}</p>
            </div>
        </div>
    </div>
);
