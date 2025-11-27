import { useWeb3AuthConnect, useWeb3AuthDisconnect, useWeb3AuthUser } from "@web3auth/modal/react";
import { CreateSmartAccount } from "./components/smart-account/CreateSmartAccount";

function App() {
  const { connect, isConnected, loading: connectLoading, error: connectError } = useWeb3AuthConnect();
  const { disconnect, loading: disconnectLoading } = useWeb3AuthDisconnect();
  const { userInfo } = useWeb3AuthUser();
  console.log(userInfo);

  const loggedInView = (
    <div className="w-full max-w-5xl mx-auto px-4 py-12 animate-fade-in">
      <header className="flex justify-between items-center mb-16 glass-panel p-6 rounded-3xl">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-blue-500/20 ring-1 ring-white/10">
            {userInfo?.name?.charAt(0) || "U"}
          </div>
          <div>
            <p className="text-xs text-blue-300 font-semibold uppercase tracking-wider mb-0.5">Welcome back</p>
            <p className="font-bold text-white text-xl tracking-tight">{userInfo?.name || "User"}</p>
          </div>
        </div>
        <button
          onClick={() => disconnect()}
          className="px-6 py-3 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 text-sm font-medium transition-all border border-slate-700 hover:border-slate-600 hover:text-white"
        >
          {disconnectLoading ? "Logging out..." : "Log Out"}
        </button>
      </header>

      <main className="grid gap-8 justify-items-center">
        <CreateSmartAccount userId={userInfo?.email || ""} />
      </main>
    </div>
  );

  const unloggedInView = (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>

      <div className="glass-panel p-16 rounded-[2.5rem] max-w-xl w-full text-center space-y-12 relative z-10 border border-white/10 shadow-2xl shadow-black/20">
        <div className="space-y-8">
          <div className="inline-flex p-4 rounded-3xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-4 shadow-inner shadow-blue-500/5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-blue-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
            </svg>
          </div>
          <h1 className="text-6xl font-bold tracking-tighter">
            <span className="text-gradient">Web3Auth</span>
          </h1>
          <p className="text-slate-400 text-xl leading-relaxed font-light">
            Experience the future of authentication with <span className="text-blue-300 font-medium">Smart Accounts</span>. <br />Secure, simple, and seamless.
          </p>
        </div>

        <button
          onClick={() => connect()}
          className="w-full btn-primary py-5 px-8 rounded-2xl text-lg shadow-xl shadow-blue-500/20 hover:shadow-blue-500/30 font-bold tracking-wide"
        >
          {connectLoading ? "Connecting..." : "Login with Web3Auth"}
        </button>

        {connectError && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm animate-fade-in">
            {connectError.message}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen text-white font-sans selection:bg-blue-500/30 selection:text-white">
      {isConnected ? loggedInView : unloggedInView}
    </div>
  );
}

export default App;