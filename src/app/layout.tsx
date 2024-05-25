'use client'

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DelegateContextProvider } from "@/providers/stateProvider";
import { NearContext } from "./contexts/WalletContext";
import { Wallet } from "./wallets/near";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

const wallet = new Wallet({ createAccessKeyFor: 'bryanfullam.testnet', networkId: 'testnet' });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [signedAccountId, setSignedAccountId] = useState('');

  useEffect(() => { wallet.startUp(setSignedAccountId) }, []);

  return (
    <html lang="en">
      <body>
        <NearContext.Provider value={{ wallet, signedAccountId }}>
            <DelegateContextProvider>{children}</DelegateContextProvider>
          </NearContext.Provider>
        </body>
    </html>
  );
}
