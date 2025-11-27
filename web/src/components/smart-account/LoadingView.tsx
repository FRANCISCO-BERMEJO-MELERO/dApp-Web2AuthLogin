export const LoadingView = () => (
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
