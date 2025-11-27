import { createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";

const BUNDLER_RPC = "https://public.pimlico.io/v2/11155111/rpc"; // tu endpoint del bundler

// Reemplaza con tu UserOperation hash
const USER_OP_HASH = "0x32a104fba7ee6a44296aec4aa6b2b9d9bb50d30b62b5fc4617b09a75e58b444b";

const main = async () => {
  // Creamos cliente JSON-RPC apuntando al bundler
  const bundlerClient = createPublicClient({
    chain: sepolia,
    transport: http(BUNDLER_RPC),
  });

  try {
    // 1️⃣ Consultar si la userOp está en mempool
    const userOp = await bundlerClient.request({
      method: "eth_getUserOperationByHash",
      params: [USER_OP_HASH],
    });

    if (!userOp) {
      console.log("UserOperation NO encontrada en el bundler mempool");
    } else {
      console.log("UserOperation encontrada:", userOp);
    }

    // 2️⃣ Consultar receipt (si ya se ejecutó en L1)
    const receipt = await bundlerClient.request({
      method: "eth_getUserOperationReceipt",
      params: [USER_OP_HASH],
    });

    if (!receipt) {
      console.log("Receipt NO encontrado. La userOp no se ha incluido en bloque todavía.");
    } else {
      console.log("Receipt de la UserOperation:", receipt);
    }
  } catch (err: any) {
    console.error("Error consultando UserOperation:", err.message || err);
  }
};

main();
