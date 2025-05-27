import { sepolia } from "viem/chains";
import abi from "../abi/votingSystem.abi.json";
import type { Abi } from "viem";

export const votingSystem = {
  abi: abi as Abi,
  address: {
    [sepolia.id]: "0x3911b27c072c45cc25464e14b44554c1a279f6bf",
  },
} as const;
export const VOTING_SYSTEM_ADDRESS = votingSystem.address[sepolia.id] as `0x${string}`
export const VOTING_SYSTEM_ABI = votingSystem.abi