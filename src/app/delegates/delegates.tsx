"use client";

import type { Delegate } from "@/domains/delegate";
import { Dao } from "@/domains/dao";
import DelegateCard from "./delegate-card";
import { useState, useEffect } from "react";
import { getDelegates } from "@/app/services";
import Loading from "@/app/components/loading";
import type { DelegateProbability } from "@/domains/proposal";

interface DelegatesProps {
  dao: Dao;
  showScores: boolean;
  delegateProbabilities: DelegateProbability[];
  onChange: (DelegateProbability: DelegateProbability[]) => void;
}

const Delegates = ({ dao, delegateProbabilities, showScores, onChange }: DelegatesProps) => {
  const [search, setSearch] = useState<string>("");
  const [delegates, setDelegates] = useState<Delegate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getDelegates(dao.id).then(delegates => {
      setDelegates(delegates);
      setLoading(false);
    }).catch(error => {
      setError(`Failed to fetch Delegates for DAO ${dao.name}.`);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loading msg={`Loading delegates for DAO ${dao.name}`}/>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const toggled = (delegate: Delegate, newState: number) => {
    let newDps = delegateProbabilities.filter(d => d.wallet !== delegate.wallet);
    if (newState !== 0) {
        newDps.push({
            wallet: delegate.wallet,
            probability: newState
        });
    }
    onChange(newDps);
  };
  console.log(delegates);

  return (
    <div className="min-w px-10 mx-auto space-y-6 py-6 max-h-svh overflow-scroll">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-10 py-4 bg-slate-100 rounded-md text-center"
        placeholder="Filter delegates"
      />
      {delegates
        .filter((delegate) =>
         (delegate.name == undefined && delegate.wallet.toLowerCase().includes(search.toLowerCase())) ||  delegate.name?.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => b.votingpower - a.votingpower)
        .map((delegate, index) => {
          const dp = delegateProbabilities.find(d => d.wallet === delegate.wallet);
          const state = dp ? dp.probability : 0;
          console.log("render",delegate.wallet)

          return (
            <DelegateCard
              key={index}
              name={delegate.name}
              votingPower={delegate.votingpower}
              wallet={delegate.wallet}
              state={state}
              showScore={showScores}
              onChange={(newState) => toggled(delegate, newState)}
            />
          );
        })}
    </div>
  );
};

export default Delegates;
