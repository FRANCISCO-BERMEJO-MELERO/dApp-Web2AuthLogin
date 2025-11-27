import { useChainId, useChains } from 'wagmi';

export function NetworkInfo() {
    const chainId = useChainId();
    const chains = useChains();

    const currentChain = chains.find(chain => chain.id === chainId);

    return (
        <div style={{
            padding: '12px 16px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '8px',
            fontSize: '14px'
        }}>
            {currentChain ? (
                <p>
                    Network: <strong>{currentChain.name}</strong> (Chain ID: {chainId})
                </p>
            ) : (
                <p>Network: Chain ID {chainId}</p>
            )}
        </div>
    );
}
