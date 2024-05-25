import { APIDelProb } from "./delegate";

export interface DelegateProbability {
  wallet: string;
  probability: number;
}

export interface ProposalRequest {
  proposal: string;
  delegates: DelegateProbability[];
  type: "similarity" | "votingpower";
}

export interface ProposalResponse {
  score: number;
  probabilities: APIDelProb[];
}
