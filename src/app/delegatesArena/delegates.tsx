"use client";

import type { Delegate } from "@/domains/delegate";
import { Dao } from "@/domains/dao";
import DelegateCard from "./delegate-card";
import { useState, useEffect } from "react";
import { getDelegates } from "@/app/services";
import Loading from "@/app/components/loading";
import type { DelegateProbability } from "@/domains/proposal";
import "./delegates.scss";
import { DndContext, useDroppable } from '@dnd-kit/core';

interface DelegatesProps {
  dao: Dao;
  showScores: boolean;
  delegateProbabilities: DelegateProbability[];
  onChange: (DelegateProbability: DelegateProbability[]) => void;
}

function normalize(num: number, numbers: number[], newMin: number = 70, newMax: number = 100): number {
  const min = Math.min(...numbers);
  const max = Math.max(...numbers);

  return newMin + ((num - min) / (max - min)) * (newMax - newMin);
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

  const toggled = (wallet: string, newState: number) => {
    let newDps = delegateProbabilities.filter(d => d.wallet !== wallet);
    if (newState !== 0) {
        newDps.push({
            wallet,
            probability: newState
        });
    }
    onChange(newDps);
  };

  const votingPowers = delegates.map(d => d.votingPower);

  const renderDelegates = (dels: Delegate[]) => {
    return dels
      .filter((delegate) =>
        delegate.name.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => b.votingPower - a.votingPower)
      .map((delegate, index) => {
        const dp = delegateProbabilities.find(d => d.wallet === delegate.wallet);
        const state = dp ? dp.probability : 0;

        return (
          <DelegateCard
            key={index}
            delegate={delegate}
            state={state}
            size={normalize(delegate.votingPower, votingPowers)}
            showScore={showScores}
            onChange={(newState) => toggled(delegate.wallet, newState)}
          />
        );
      });
  }

  const filterDelegates = (side: number) => {
    return delegates.filter(d =>
        delegateProbabilities.find(dp => d.wallet === dp.wallet && dp.probability === side)
    );
  };

  const supporters = filterDelegates(1);
  const nonSupporters = filterDelegates(-1);
  const neutral = delegateProbabilities.length ? delegates.filter(d =>
      !delegateProbabilities.find(dp => d.wallet === dp.wallet && (dp.probability === -1 || dp.probability === 1))
  ) : delegates;

  function handleDragEnd({ active, over }: any) {
    if (!active || !over) {
        return;
    }

    const wallet = active.id;
    const droppableId = over.id;

    let newState = 0;
    if (droppableId == "non-supporters") {
        newState = -1;
    } else if (droppableId == "supporters") {
        newState = 1;
    }

    toggled(wallet, newState);
  }

  return (
    <div className="delegates">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-10 py-4 bg-slate-100 rounded-md text-center"
        placeholder="Filter delegates"
      />

      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex">
          <div className="supporters flex flex-col w-1/6">
            <Droppable id="supporters">
              <h4>Supporters</h4>
              <div className="grid grid-cols-2 gap-10">
              {renderDelegates(supporters)}
              </div>
            </Droppable>
          </div>
          <div className="delegate-pool flex flex-col w-2/3">
            <Droppable id="pool">
              <h4>All Delegates</h4>
              <div className="grid grid-cols-9 gap-10">
              {renderDelegates(neutral)}
              </div>
            </Droppable>
          </div>
          <div className="non-supporters flex flex-col w-1/6 ">
            <Droppable id="non-supporters">
              <h4>Non-Supporters</h4>
              <div className="grid grid-cols-2 gap-10">
              {renderDelegates(nonSupporters)}
              </div>
            </Droppable>
          </div>
        </div>
      </DndContext>

    </div>
  );
};

export default Delegates;

export function Droppable(props: any) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style = {
    opacity: !isOver ? 1 : 0.5,
  };

  return (
    <div ref={setNodeRef} style={style} className="droppable">
      {props.children}
    </div>
  );
}
