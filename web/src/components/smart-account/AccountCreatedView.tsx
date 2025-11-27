interface AccountCreatedViewProps {
    smartAccountAddress: string;
    txHash?: string;
    sending: boolean;
    onSend: () => void;
    userOpHash?: string;
}

export const AccountCreatedView = ({ smartAccountAddress, txHash, sending, onSend, userOpHash }: AccountCreatedViewProps) => (
    <div className="glass-panel p-10 rounded-[2rem] max-w-md w-full mx-auto text-center space-y-8 animate-fade-in border border-green-500/20 shadow-2xl shadow-green-900/20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50"></div>

        <div className="w-24 h-24 bg-green-500/10 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4 ring-1 ring-green-500/30 shadow-[0_0_30px_-5px_rgba(34,197,94,0.3)]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
        </div>

        <div className="space-y-3">
            <h3 className="text-3xl font-bold text-white tracking-tight">Smart Account Ready</h3>
            <p className="text-slate-400 text-base">Your account is active on Sepolia.</p>
        </div>

        <div className="bg-slate-950/40 p-6 rounded-2xl border border-slate-800 break-all group hover:border-slate-700 transition-colors text-left space-y-4">
            <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1.5 font-bold">Wallet Address</p>
                <p className="font-mono text-blue-400 text-sm bg-blue-500/5 p-2 rounded-lg border border-blue-500/10">{smartAccountAddress}</p>
            </div>
            {txHash && (
                <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1.5 font-bold">Transaction Hash</p>
                    <p className="font-mono text-blue-400 text-sm bg-blue-500/5 p-2 rounded-lg border border-blue-500/10">{txHash}</p>
                </div>
            )}
        </div>

        <div className="space-y-4">
            <button
                onClick={onSend}
                disabled={sending}
                className="btn btn-primary w-full hover:cursor-pointer flex items-center justify-center gap-2 font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20"
            >
                {sending ? (
                    <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                    </>
                ) : (
                    "Send Test Transaction"
                )}
            </button>

            {userOpHash && (
                <div className="bg-green-500/10 p-4 rounded-xl border border-green-500/20 animate-fade-in text-left">
                    <p className="text-xs text-green-400 mb-1 font-bold uppercase tracking-wider">UserOp Sent</p>
                    <p className="font-mono text-xs text-slate-300 break-all">{userOpHash}</p>
                </div>
            )}
        </div>
    </div>
);
