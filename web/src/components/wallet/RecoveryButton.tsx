import { useState } from "react";
import { createPortal } from "react-dom";
import { useWeb3Auth } from "@web3auth/modal/react";

export const RecoveryButton = () => {
    const { provider } = useWeb3Auth();
    const [isOpen, setIsOpen] = useState(false);
    const [privateKey, setPrivateKey] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const getPrivateKey = async () => {
        if (!provider) return;
        setLoading(true);
        try {
            const key = await provider.request({ method: "private_key" });
            setPrivateKey(key as string);
        } catch (error) {
            console.error("Error fetching private key:", error);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        if (privateKey) {
            navigator.clipboard.writeText(privateKey);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const closeModal = () => {
        setIsOpen(false);
        setPrivateKey(null);
        setLoading(false);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="px-6 py-3 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 text-sm font-medium transition-all border border-blue-500/20 hover:border-blue-500/30 hover:text-blue-200"
            >
                Recovery
            </button>

            {isOpen && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-slate-950/90 backdrop-blur-md animate-fade-in"
                        onClick={closeModal}
                    />

                    {/* Modal Container */}
                    <div className="relative w-full max-w-lg animate-fade-in z-10">
                        {/* Glow Effect */}
                        <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500 to-purple-600 rounded-4xl opacity-20 blur-xl"></div>

                        <div className="relative bg-slate-900/95 p-8 rounded-4xl border border-white/10 shadow-2xl">
                            {/* Header */}
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <h3 className="text-2xl font-bold text-white tracking-tight">Account Recovery</h3>
                                    <p className="text-slate-400 text-sm mt-1">Manage your private key securely</p>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="p-2 -mr-2 -mt-2 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            </div>

                            {/* Content */}
                            <div className="space-y-8">
                                {!privateKey ? (
                                    <>
                                        <div className="p-6 rounded-2xl bg-linear-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity group-hover:opacity-70"></div>

                                            <div className="flex gap-4 relative z-10">
                                                <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400 h-fit">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                                                        <line x1="12" y1="9" x2="12" y2="13"></line>
                                                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h4 className="text-amber-200 font-bold mb-2 text-lg">Warning: Sensitive Data</h4>
                                                    <p className="text-amber-200/80 text-sm leading-relaxed">
                                                        You are about to reveal your private key. Never share this key with anyone, including support staff.
                                                        Anyone with this key can steal your funds.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={getPrivateKey}
                                            disabled={loading}
                                            className="w-full py-4 rounded-xl flex items-center justify-center gap-3 text-lg font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/25 relative z-20"
                                        >
                                            {loading ? (
                                                <>
                                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                                    Retrieving Securely...
                                                </>
                                            ) : (
                                                <>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                                                        <circle cx="12" cy="12" r="3"></circle>
                                                    </svg>
                                                    Reveal Private Key
                                                </>
                                            )}
                                        </button>
                                    </>
                                ) : (
                                    <div className="space-y-6 animate-fade-in">
                                        <div className="space-y-2">
                                            <label className="text-slate-400 text-sm font-medium ml-1">Your Private Key</label>
                                            <div className="relative group">
                                                <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500/50 to-purple-600/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur"></div>
                                                <div className="relative w-full p-5 rounded-xl bg-slate-950 border border-white/10 font-mono text-sm text-slate-300 break-all shadow-inner">
                                                    {privateKey}
                                                </div>
                                                <button
                                                    onClick={copyToClipboard}
                                                    className="absolute top-3 right-3 p-2 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition-all backdrop-blur-sm border border-white/5"
                                                    title="Copy to clipboard"
                                                >
                                                    {copied ? (
                                                        <div className="flex items-center gap-2 text-green-400">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <polyline points="20 6 9 17 4 12"></polyline>
                                                            </svg>
                                                            <span className="text-xs font-bold">Copied!</span>
                                                        </div>
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                                        </svg>
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex gap-3 items-center">
                                            <div className="p-2 rounded-full bg-blue-500/20 text-blue-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <circle cx="12" cy="12" r="10"></circle>
                                                    <line x1="12" y1="16" x2="12" y2="12"></line>
                                                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                                </svg>
                                            </div>
                                            <p className="text-blue-200/80 text-xs">
                                                Store this key in a safe place. Do not lose it.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
};
