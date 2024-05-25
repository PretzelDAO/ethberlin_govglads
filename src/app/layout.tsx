'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/header";
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
    <html lang="en" className="h-full">
      <body className={inter.className}>
        <NearContext.Provider value={{ wallet, signedAccountId }}>
          <Header />
          <DelegateContextProvider>{children}</DelegateContextProvider>
        </NearContext.Provider>
      </body>
    </html>
  );
}
