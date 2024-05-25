"use client";

import Daos from "@/app/daos/daos";
import Proposal from "@/app/proposal/proposal";
import type { Dao } from "@/domains/dao";
import React, { useContext, useState } from 'react';
import { NearContext } from "./contexts/WalletContext";

export default function Home() {
  const [dao, setDao] = useState<Dao | undefined>(undefined);
  const { signedAccountId, wallet } = useContext(NearContext);

  return (
    <main className="relative flex flex-col items-center justify-between p-24">
      <button className="btn btn-primary" onClick={async () => {
        if (wallet) {
          await wallet.callMethod({
            method: 'nft_mint',
            args: {
              token_id: "token-4",
              receiver_id: signedAccountId, 
              token_metadata: {
                title: "NFT Primitive Token",
                description: "Awesome NFT Primitive Token",
                media: "https://cdn.pixabay.com/photo/2022/01/17/17/20/bored-6945309_1280.png", // URL to associated media, preferably to decentralized, content-addressed storage
              }
            },
            contractId: "bryanfullam.testnet",
            deposit: "10000000000000000000000",
            gas: "300000000000000",
          });
        }
      }}>Mint NFT</button>
      {!dao && <Daos daoSelected={(d) => setDao(d)} />}
      {dao && <Proposal dao={dao} onSubmit={() => {}} />}
    </main>
  );
}
