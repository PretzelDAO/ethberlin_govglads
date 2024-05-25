"use client";

import Page from "@/app/delegates/page";
import DelegateCard from "./delegate-card";
import { useState } from "react";
import "./proposal.scss";
import { submitProposal } from "@/app/services";
import { Delegate } from "@/domains/delegate";


interface ProposalProps {
  dao: Dao;
  onSubmit: () => void;
}

const Proposal = ({ dao, onSubmit }: ProposalProps) => {
  const [proposal, setProposal] = useState<string>("");
  const [selectedDelegates, setSelectedDelegates] = useState<Delegate[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitProposal(dao.id, {
        proposal,
        delegates: selectedDelegates
    });
  };

  const disabled = !proposal;

  return (
    <form className="proposal max-w-xl mx-auto space-y-6 py-6" onSubmit={handleSubmit}>
      <img className="dao-logo" src={dao.logo} alt="DAO Logo"/>
      <h3>1. Test a new proposal on "{dao.name}" DAO:</h3>
      <textarea
        value={proposal}
        onChange={(e) => setProposal(e.target.value)}
        className="w-full px-3 py-3 bg-slate-100 rounded-md"
        placeholder="Type your new proposal..."
      />
      <h3>2. Select your delegates:</h3>
      <Page/>
      <button
        type="submit"
        disabled={disabled}
        className={`w-full px-6 py-2 rounded-lg text-white font-bold focus:outline-none focus:ring-2 focus:ring-offset-2
              ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-500'}`}
      >
        Test proposal now
      </button>
    </form>
  );
};

export default Proposal;
