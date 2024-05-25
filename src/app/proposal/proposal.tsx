"use client";

import Delegates from "@/app/delegates/delegates";
import { useContext, useState } from "react";
import "./proposal.scss";
import { submitProposal } from "@/app/services";
import { ProposalResponse, type DelegateProbability } from "@/domains/proposal";
import Loading from "@/app/components/loading";
import type { Dao } from "@/domains/dao";
import SubmitButton from "./submit-button";
import { DelegateContext } from "@/providers/stateProvider";
import Results from "../results/results";
import Toggle from "../components/toggle";

interface ProposalProps {
  dao: Dao;
  onSubmit: () => void;
}

const Proposal = ({ dao, onSubmit }: ProposalProps) => {
  const [proposal, setProposal] = useState<string>("");
  const [selectedDelegateProbabilities, setSelectedDelegateProbabilities] =
    useState<DelegateProbability[]>([]);
  const [score, setScore] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(false);

  const [showResults, setShowResults] = useState<boolean>(false);
  const dCon = useContext(DelegateContext);

  if (loading) {
    return <Loading msg={"Calculating your proposal's score"} />;
  }

  const disabled = !proposal;

  if (showResults) {
    return (
      <Results
        dao={dao}
        delegateProbabilities={selectedDelegateProbabilities}
        showScores={true}
        onChange={setSelectedDelegateProbabilities}
      />
    );
  }

  return (
    <div className="proposal max-w-xl mx-auto space-y-6">
      <img className="dao-logo" src={dao.logo} alt="DAO Logo" />
      <h3>1. Test a new proposal on &quot;{dao.name}&quot; DAO:</h3>
      <div className="row row-auto">
        <textarea
          value={proposal}
          onChange={(e) => setProposal(e.target.value)}
          className="w-full px-3 py-3 bg-slate-100 rounded-md"
          placeholder="Type your new proposal..."
        />
        <button
          onClick={() => {
            dCon.setDelegates(
              dCon.delegates.map((d) => {
                return { ...d, score: 0 };
              })
            );
          }}
        >
          Reset
        </button>
      </div>
      <div className="flex justify-center">
        <Toggle leftLabel="aaa" rightLabel="bbb" />
      </div>
      <h3>2. Select your delegates:</h3>
      <Delegates
        showScores={score !== -1}
        dao={dao}
        delegateProbabilities={selectedDelegateProbabilities}
        onChange={setSelectedDelegateProbabilities}
      />
      {score !== -1 && (
        <p>The probability of your proposal passing is: {score}</p>
      )}
      <SubmitButton
        disabled={disabled}
        onClick={() => {
          submitProposal(dao.id, {
            proposal,
            delegates: dCon.selectedDelegates,
          })
            .then((response: ProposalResponse) => {
              // setScore(response.score);
              const delProbs: any = {};
              response.probabilities.forEach((d) => {
                delProbs[d.voter] = d.similarity_ratio;
              });
              // dCon.setFinalResults(response);
              dCon.setDelegates(
                dCon.delegates.map((d) => {
                  return { ...d, score: delProbs[d.wallet] };
                })
              );
              console.log("SET RES", response);

              setLoading(false);
              setShowResults(true);
            })
            .catch((error) => {
              console.error(error);
              setLoading(false);
            });
        }}
      />
    </div>
  );
};

export default Proposal;
