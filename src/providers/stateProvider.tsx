"use client";

import { Delegate } from "@/domains/delegate";
import { delegates } from "@/domains/mocks";
import { createContext, useContext, useState } from "react";

const defVal: {
  isSubmitted: boolean;
  delegates: Delegate[];
  setDelegates: (list: any) => void;
  selectedDelegates: {'wallet':string, 'probability':number}[];
  setSelectedDelegates: (list:any) => void;
} = {
  isSubmitted: false,
  delegates: [],
  setDelegates: (list: any) => {},
  selectedDelegates:[],
  setSelectedDelegates: (list:any) => {},
}
export const DelegateContext = createContext(defVal);

export function DelegateContextProvider({ children }: { children: any }) {
  const [isSubmitted, setIsOpen] = useState(false);
  const d :{'wallet':string, 'probability':number}[] = [];
  const [selectedDelegates, setSelectedDelegates] = useState(d);
  const [delegates, setDelegates] = useState<Delegate[]>([]);

  return (
    <DelegateContext.Provider value={{ isSubmitted,selectedDelegates,setSelectedDelegates,delegates, setDelegates }}>
      {children}
    </DelegateContext.Provider>
  );
}
