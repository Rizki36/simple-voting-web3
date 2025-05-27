import { useWriteContract, useReadContract } from 'wagmi'
import {
  VOTING_SYSTEM_ABI,
  VOTING_SYSTEM_ADDRESS,
} from '@/contracts/votingSystem'

/**
 * Submit a new proposal (admin only).
 */
export function useCreateProposal() {
  const { writeContractAsync, isPending, error } = useWriteContract()

  return {
    createProposal: (
      title: string,
      description: string,
      options: string[],
      endTime: bigint
    ) =>
      writeContractAsync({
        abi: VOTING_SYSTEM_ABI,
        address: VOTING_SYSTEM_ADDRESS,
        functionName: 'createProposal',
        args: [title, description, options, endTime],
      }),
    isPending,
    error,
  }
}

/**
 * Cast a vote on a proposal.
 */
export function useVote() {
  const { writeContractAsync, isPending, error } = useWriteContract()

  return {
    vote: (proposalId: bigint, optionIndex: bigint) =>
      writeContractAsync({
        abi: VOTING_SYSTEM_ABI,
        address: VOTING_SYSTEM_ADDRESS,
        functionName: 'vote',
        args: [proposalId, optionIndex],
      }),
    isPending,
    error,
  }
}

/**
 * Get full proposal details by ID.
 * Returns: { title, description, options, endTime, ended }
 */
export function useProposal(proposalId: bigint) {
  return useReadContract({
    abi: VOTING_SYSTEM_ABI,
    address: VOTING_SYSTEM_ADDRESS,
    functionName: 'getProposal',
    args: [proposalId],
  })
}

/**
 * Get current vote counts for each option of a proposal.
 * Returns: bigint[]
 */
export function useVoteCounts(proposalId: bigint) {
  return useReadContract({
    abi: VOTING_SYSTEM_ABI,
    address: VOTING_SYSTEM_ADDRESS,
    functionName: 'getVoteCounts',
    args: [proposalId],
  })
}