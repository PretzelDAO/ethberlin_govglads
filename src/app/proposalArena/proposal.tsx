"use client";

import Delegates from "@/app/delegatesArena/delegates";
import { useState } from "react";
import "./proposal.scss";
import { submitProposal } from "@/app/services";
import { ProposalResponse, type DelegateProbability } from "@/domains/proposal";
import Loading from "@/app/components/loading";
import type { Dao } from "@/domains/dao";


interface ProposalProps {
  dao: Dao;
  onSubmit: () => void;
}

const Proposal = ({ dao, onSubmit }: ProposalProps) => {
  const [proposal, setProposal] = useState<string>("");
  const [selectedDelegateProbabilities, setSelectedDelegateProbabilities] = useState<DelegateProbability[]>([]);
  const [score, setScore] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setScore(-1);
    setLoading(true);
    submitProposal(dao.id, {
        proposal,
        delegates: selectedDelegateProbabilities
    }).then((res: ProposalResponse) => {
        setScore(res.score);
        setSelectedDelegateProbabilities((res as any).delegates);
    }).finally(() => setLoading(false));
  };

  if (loading) {
    return <Loading msg={"Calculating your proposal's score"}/>;
  }


  const disabled = !proposal;

  return (
    <form
      className="proposal space-y-6 py-6"
      onSubmit={handleSubmit}
    >
      <div className="proposal-section max-w-xl mx-auto space-y-6 py-6">
          <textarea
            value={proposal}
            onChange={(e) => setProposal(e.target.value)}
            className="w-full px-3 py-3 bg-slate-100 rounded-md"
            placeholder="Author a proposal"
          />
          <button
            type="submit"
            disabled={disabled}
            className={`w-full px-6 py-2 rounded-lg text-white font-bold focus:outline-none focus:ring-2 focus:ring-offset-2
                  ${
                    disabled
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-amber-500 hover:bg-amber-600 focus:ring-amber-500"
                  }`}
          >
            Submit proposal to the masses
          </button>
          <h3>Select your supporters</h3>
      </div>
      <Delegates
        showScores={score !== -1}
        dao={dao}
        delegateProbabilities={selectedDelegateProbabilities}
        onChange={setSelectedDelegateProbabilities}
      />
      {score !== -1 && (
        <p>The probability of your proposal passing is: {score}</p>
      )}
    </form>
  );
};

export default Proposal;
