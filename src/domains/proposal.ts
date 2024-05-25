import { APIDelProb } from "./delegate";

export interface DelegateProbability {
  wallet: string;
  probability: number;
}

export interface ProposalRequest {
  proposal: string;
  delegates: DelegateProbability[];
}

export interface ProposalResponse {
  score: number;
  probabilities: APIDelProb[];
}
