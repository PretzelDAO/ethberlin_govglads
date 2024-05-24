import { Delegate } from "@/domains/delegate";

export interface ProposalRequest {
  proposal: string;
  delegates: [Delegate];
}

export interface ProposalResponse {
  score: number;
  delegates: [Delegate];
}
