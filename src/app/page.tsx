"use client";

import Image from "next/image";
import Daos from "@/app/daos/daos";
import Proposal from "@/app/proposal/proposal";
import React, { useEffect, useState } from "react";
import type { Dao } from "@/domains/dao";

export default function Home() {
  const [dao, setDao] = useState<Dao | undefined>(undefined);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {!dao && <Daos daoSelected={(d) => setDao(d)} />}
        {dao && <Proposal dao={dao} onSubmit={() => {}}/>}
    </main>
  );
}
