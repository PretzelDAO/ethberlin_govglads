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

const Results = ({ dao, delegateProbabilities, showScores, onChange }: DelegatesProps) => {
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
        <div>
            
        </div>
    </div>
  );
};

export default Results;
