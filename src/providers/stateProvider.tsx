"use client";

import { Delegate } from "@/domains/delegate";
import { delegates } from "@/domains/mocks";
import { createContext, useContext, useState } from "react";

const defVal: {
  isSubmitted: boolean;
  delegates: Delegate[];
  setDelegates: (list: any) => void;
  selectedDelegates: { wallet: string; probability: number }[];
  setSelectedDelegates: (list: any) => void;
  finalResults: any;
  setFinalResults: (list: any) => void;
  config: any;
  setConfig: (config: any) => void;
} = {
  isSubmitted: false,
  delegates: [],
  setDelegates: (list: any) => {},
  selectedDelegates: [],
  setSelectedDelegates: (list: any) => {},
  finalResults: {},
  setFinalResults: (list: any) => {},
  config: {},
  setConfig: (config: any) => {},
};
export const DelegateContext = createContext(defVal);

export function DelegateContextProvider({ children }: { children: any }) {
  const [isSubmitted, setIsOpen] = useState(false);
  const d: { wallet: string; probability: number }[] = [];
  const [selectedDelegates, setSelectedDelegates] = useState(d);
  const [delegates, setDelegates] = useState<Delegate[]>([]);
  const [finalResults, setFinalResults] = useState({});
  const [config, setConfig] = useState({ similarity: true });

  return (
    <DelegateContext.Provider
      value={{
        isSubmitted,
        selectedDelegates,
        setSelectedDelegates,
        delegates,
        setDelegates,
        finalResults,
        setFinalResults,
        config,
        setConfig,
      }}
    >
      {children}
    </DelegateContext.Provider>
  );
}
