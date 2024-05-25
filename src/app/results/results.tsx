"use client";

import type { Delegate } from "@/domains/delegate";
import { Dao } from "@/domains/dao";
import DelegateCard from "./delegate-card";
import { useState, useEffect, useContext } from "react";
import { getDelegates } from "@/app/services";
import Loading from "@/app/components/loading";
import type { DelegateProbability } from "@/domains/proposal";
import { DelegateContext } from "@/providers/stateProvider";
import DelegateCluster from "../delegates/delegate_cluster";
import { makeNiceAddress } from "@/utils/stringutils";

interface DelegatesProps {
  dao: Dao;
  showScores: boolean;
  delegateProbabilities: DelegateProbability[];
  onChange: (DelegateProbability: DelegateProbability[]) => void;
}

const Results = ({
  dao,
  delegateProbabilities,
  showScores,
  onChange,
}: DelegatesProps) => {
  const [search, setSearch] = useState<string>("");
  // const [delegates, setDelegates] = useState<Delegate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dCon = useContext(DelegateContext);

  if (loading) {
    return <Loading msg={`Loading delegates for DAO ${dao.name}`} />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const toggled = (delegate: Delegate, newState: number) => {
    let newDps = delegateProbabilities.filter(
      (d) => d.wallet !== delegate.wallet
    );
    if (newState !== 0) {
      newDps.push({
        wallet: delegate.wallet,
        probability: newState,
      });
    }
    onChange(newDps);
  };

  return (
    <div className="px-2">
      <div className="h-1/2 overflow-hidden">
        <DelegateCluster />
      </div>
      <div className="flex flex-row">
        <div className="flex flex-col w-1/2">
          <h3>Delegates voting for</h3>
          <div className="flex flex-col px-2">
            {dCon.delegates
              .filter((d) => d.votingpower / d.maxvotingpower > 0.05)
              .filter((d) => (d.score ?? 0) > 0)
              .map((d) => {
                return (
                  <div
                    key={d.wallet}
                    className="bg-green-400 my-0.5 rounded-md"
                  >
                    <p>
                      {d.name ?? makeNiceAddress(d.wallet)} (
                      {Math.round(d.votingpower / 1000)}
                      k)
                    </p>
                    <p>
                      Probability: {Math.ceil(Math.abs(d.score ?? 0) * 100)}%
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
