"use client";

import type { Delegate } from "@/domains/delegate";
import { Dao } from "@/domains/dao";
import { useState, useEffect, useContext } from "react";
import { getDelegates } from "@/app/services";
import Loading from "@/app/components/loading";
import type { DelegateProbability } from "@/domains/proposal";
import { DelegateContext } from "@/providers/stateProvider";
import dynamic from "next/dynamic";
const DelegateCluster = dynamic(() => import("../delegates/delegate_cluster"), {
  ssr: false,
});
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
    <div className="px-2 justify-center w-full">
      <h2>
        Your Proposal Passing Chance: {Math.ceil(dCon.finalResults.score * 100)}
        %
      </h2>
      <h2>
        ({Math.round(dCon.finalResults.vp_for / 1000)}
        k) vs ({Math.round(dCon.finalResults.vp_against / 1000)}
        k)
      </h2>
      <h3>Delegates Connection window</h3>
      <div className="h-[400px] w-[400px]  rounded-md border-blue-400 border-2 overflow-hidden">
        <DelegateCluster />
      </div>
      <div className="flex flex-row">
        <div className="flex flex-col w-1/2">
          <h3>Delegates voting for</h3>
          <div className="flex flex-col px-2">
            {dCon.delegates
              .filter((d) => d.votingpower / d.maxvotingpower > 0.05)
              .filter((d) => (d.score ?? 0) > 0)
              .sort((a, b) => b.votingpower - a.votingpower)
              .map((d) => {
                console.log(d.name, d.wallet);
                if (d.name?.startsWith("0x")) {
                  d.name = makeNiceAddress(d.name);
                }
                return (
                  <div
                    key={d.wallet}
                    className="bg-green-400/60 my-0.5 rounded-md w-full p-1"
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
        <div className="flex flex-col w-1/2">
          <h3>Delegates voting against</h3>
          <div className="flex flex-col px-2">
            {dCon.delegates
              .filter((d) => d.votingpower / d.maxvotingpower > 0.05)
              .filter((d) => (d.score ?? 0) < 0)
              .sort((a, b) => b.votingpower - a.votingpower)
              .map((d) => {
                console.log(d.name, d.wallet);
                return (
                  <div
                    key={d.wallet}
                    className="bg-red-400/60 my-0.5 rounded-md p-1"
                  >
                    <p>
                      {d.name?.substring(0, 20) ?? makeNiceAddress(d.wallet)} (
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
