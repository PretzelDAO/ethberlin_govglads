"use client";

import Image from "next/image";
// import Daos from "@/app/daos/daos";
import Daos from "@/app/daosArena/daos";
// import Proposal from "@/app/proposal/proposal";
import Proposal from "@/app/proposalArena/proposal";
import React, { useEffect, useState } from "react";
import type { Dao } from "@/domains/dao";
import Header from "@/app/components/header";

export default function Home() {
  const [dao, setDao] = useState<Dao | undefined>(undefined);
  return (
    <main className="relative min-h-screen items-center justify-between bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url('/bg.png')" }}
    >
        <Header dao={dao}/>
        {!dao && <Daos daoSelected={(d) => setDao(d)} />}
        {dao && <Proposal dao={dao} onSubmit={() => {}}/>}
    </main>
  );
}
