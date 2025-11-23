import { defineChain, createPublicClient, http } from "viem";

export const eduChainTestnet = defineChain({
  id: 656476,
  name: "EduChain Testnet",
  network: "educhain-testnet",
  nativeCurrency: { decimals: 18, name: "EDU", symbol: "EDU" },
  rpcUrls: {
    default: {
      http: [
        "https://rpc.open-campus-codex.gelato.digital",
        "https://open-campus-codex-sepolia.drpc.org",
      ],
    },
  },
  blockExplorers: {
    default: {
      name: "EduChainScan",
      url: "https://edu-chain-testnet.blockscout.com",
    },
  },
  testnet: true,
  fees: { defaultPriorityFee: () => 1n, defaultBaseFee: () => 1_000_000_000n },
});

export const publicClient = createPublicClient({
  chain: eduChainTestnet,
  transport: http(eduChainTestnet.rpcUrls.default.http[0]),
});
