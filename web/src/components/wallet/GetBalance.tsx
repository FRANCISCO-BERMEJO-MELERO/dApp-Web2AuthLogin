import { useAccount, useBalance } from 'wagmi';
import { formatUnits } from 'viem';

export function GetBalance() {
    const { address } = useAccount();
    const { data: balance, isLoading, error } = useBalance({ address });

    if (isLoading) return <div className="loading">Loading balance...</div>;
    if (error) return <div className="error">Error loading balance</div>;

    return (
        <div style={{
            padding: '12px 16px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '8px',
            fontSize: '14px'
        }}>
            {balance && (
                <p>
                    Balance: {formatUnits(balance.value, balance.decimals)} {balance.symbol}
                </p>
            )}
        </div>
    );
}
