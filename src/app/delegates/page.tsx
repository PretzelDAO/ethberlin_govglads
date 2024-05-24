"use client";

import type { Delegate } from "@/domains/delegate";
import DelegateCard from "./delegate-card";
import { useState } from "react";

const delegates: Delegate[] = [
  {
    wallet: "0x1234567890abcdef",
    name: "Delegate 1",
    logo: "https://via.placeholder.com/150",
    votingPower: 100,
  },
  {
    wallet: "0xabcdef1234567890",
    name: "Delegate 2",
    logo: "https://via.placeholder.com/150",
    votingPower: 200,
  },
];

const Page = () => {
  const [search, setSearch] = useState<string>("");
  return (
    <div className="max-w-xl mx-auto space-y-6 py-6">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-10 py-4 bg-slate-100 rounded-md text-center"
        placeholder="Filter delegates"
      />
      {delegates.map((delegate, index) => (
        <DelegateCard key={index} name={delegate.name} />
      ))}
    </div>
  );
};

export default Page;
