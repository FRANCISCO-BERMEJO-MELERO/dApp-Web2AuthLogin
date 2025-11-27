interface TransactionViewProps {
    smartAccountAddress: string;
    sending: boolean;
    userOpHash: string;
    onSend: () => void;
}

export const TransactionView = ({ smartAccountAddress, sending, userOpHash, onSend }: TransactionViewProps) => (
    <div className="space-y-8 animate-fade-in">
        <div className="bg-slate-950/40 p-6 rounded-2xl border border-slate-800 relative group hover:border-slate-700 transition-colors">
            <p className="text-xs text-slate-500 mb-3 font-bold uppercase tracking-wider">Deployed Address</p>
            <p className="font-mono text-sm text-blue-400 break-all">{smartAccountAddress}</p>
        </div>

        <div className="bg-slate-950/40 p-6 rounded-2xl border border-slate-800">
            <p className="text-sm text-slate-400 mb-4">Send a test transaction to verify your smart account.</p>
            <button
                onClick={onSend}
                disabled={sending}
                className="btn btn-primary w-full hover:cursor-pointer flex items-center justify-center gap-2 font-bold py-4 rounded-xl"
            >
                {sending ? (
                    <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending Transaction...
                    </>
                ) : (
                    "Send Test Transaction"
                )}
            </button>
        </div>

        {userOpHash && (
            <div className="bg-green-500/10 p-6 rounded-2xl border border-green-500/20 animate-fade-in">
                <p className="text-xs text-green-400 mb-2 font-bold uppercase tracking-wider">UserOp Sent Successfully</p>
                <p className="font-mono text-xs text-slate-300 break-all bg-black/20 p-3 rounded-lg border border-white/5">{userOpHash}</p>
            </div>
        )}
    </div>
);
