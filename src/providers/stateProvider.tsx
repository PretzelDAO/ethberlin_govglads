"use client";

import { delegates } from "@/domains/mocks";
import { createContext, useContext, useState } from "react";

const defVal: {
  isSubmitted: boolean;
  delegates: {'wallet':string, 'state':number}[];
  setDelegates: (list:any) => void;
} = {
  isSubmitted: false,
  delegates:[],
  setDelegates: (list:any) => {},
}
export const DelegateContext = createContext(defVal);

export function DelegateContextProvider({ children }: { children: any }) {
  const [isSubmitted, setIsOpen] = useState(false);
  const d :{'wallet':string, 'state':number}[] = [];
  const [delegates, setDelegates] = useState(d);

  return (
    <DelegateContext.Provider value={{ isSubmitted,delegates,setDelegates }}>
      {children}
    </DelegateContext.Provider>
  );
}
