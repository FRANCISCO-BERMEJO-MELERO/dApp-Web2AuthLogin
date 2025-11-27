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

    </div>
);
