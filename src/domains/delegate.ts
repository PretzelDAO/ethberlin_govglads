export interface Delegate {
  wallet: `0x${string}`;
  name?: string;
  logo?: string;
  votingpower: number;
  maxvotingpower: number;
  score?: number;
}

export interface APIDelProb {
  voter: string;
  similarity_ratio: number;
  overall: number;
  weighted_score: number;
}
