"use client";

import type { Delegate } from "@/domains/delegate";
import { Dao } from "@/domains/dao";
import DelegateCard from "./delegate-card";
import { useState, useEffect, useContext } from "react";
import { getDelegates } from "@/app/services";
import Loading from "@/app/components/loading";
import type { DelegateProbability } from "@/domains/proposal";
import { DelegateContext } from "@/providers/stateProvider";

interface DelegatesProps {
  dao: Dao;
  showScores: boolean;
  delegateProbabilities: DelegateProbability[];
  onChange: (DelegateProbability: DelegateProbability[]) => void;
}

const Delegates = ({ dao, delegateProbabilities, showScores, onChange }: DelegatesProps) => {
  const [search, setSearch] = useState<string>("");
  // const [delegates, setDelegates] = useState<Delegate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const dCon = useContext(DelegateContext);


  
  useEffect(() => {
    getDelegates(dao.id).then(delegates => {
      // setDelegates(delegates);
      dCon.setDelegates(delegates);
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
  console.log(dCon.delegates);

  return (
    <div className="px-10 mx-auto space-y-6">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-10 py-4 bg-slate-100 rounded-md text-center"
        placeholder="Filter delegates"
      />
      {dCon.delegates
        .filter(
          (delegate) =>
            (delegate.name == undefined &&
              delegate.wallet.toLowerCase().includes(search.toLowerCase())) ||
            delegate.name?.toLowerCase().includes(search.toLowerCase())
        )
        .filter(
          (delegate) => delegate.votingpower / delegate.maxvotingpower > 0.05
        )
        .sort((a, b) => b.votingpower - a.votingpower)
        .map((delegate, index) => {
          const dp = delegateProbabilities.find(
            (d) => d.wallet === delegate.wallet
          );
          const state = dp ? dp.probability : 0;
          // console.log("render",delegate.wallet)

          return (
            <DelegateCard
              key={index}
              name={delegate.name}
              votingPower={delegate.votingpower}
              wallet={delegate.wallet}
              state={state}
              showScore={showScores}
              onChange={(newState) => toggled(delegate, newState)}
              maxvotingpower={delegate.maxvotingpower}
            />
          );
        })}
    </div>
  );
};

export default Delegates;
