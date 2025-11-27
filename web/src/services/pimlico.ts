export const getPimlicoGasPrice = async () => {
    const bundlerRpc = import.meta.env.VITE_BUNDLER_RPC;
    if (!bundlerRpc) {
        throw new Error("VITE_BUNDLER_RPC is not defined");
    }

    const rpcResp = await fetch(bundlerRpc, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            jsonrpc: "2.0",
            id: 1,
            method: "pimlico_getUserOperationGasPrice",
            params: [],
        }),
    });

    const rpcJson = await rpcResp.json();
    if (!rpcJson || rpcJson.error) {
        throw new Error("Failed to fetch gas price from pimlico: " + JSON.stringify(rpcJson?.error || rpcJson));
    }

    const result = rpcJson.result;
    const fast = result?.fast ?? result ?? {};

    const toBigIntSafe = (v: any) => {
        if (v === undefined || v === null) return 0n;
        if (typeof v === "bigint") return v;
        if (typeof v === "number") return BigInt(Math.floor(v));
        if (typeof v === "string") {
            return v.startsWith("0x") ? BigInt(v) : BigInt(v);
        }
        return BigInt(v.toString());
    };

    const maxFeePerGas = toBigIntSafe(fast.maxFeePerGas ?? fast.maxFeePerGasWei ?? fast.maxFee);
    const maxPriorityFeePerGas = toBigIntSafe(fast.maxPriorityFeePerGas ?? fast.maxPriorityFeePerGasWei ?? fast.maxPriorityFee);

    if (maxFeePerGas === 0n || maxPriorityFeePerGas === 0n) {
        throw new Error("Pimlico returned invalid gas prices");
    }

    return { maxFeePerGas, maxPriorityFeePerGas };
};
