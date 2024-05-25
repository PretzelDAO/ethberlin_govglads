"use client";

import Daos from "@/app/daos/daos";
import Proposal from "@/app/proposal/proposal";
import type { Dao } from "@/domains/dao";
import React, { useState } from 'react';

export default function Home() {
  const [dao, setDao] = useState<Dao | undefined>(undefined);
  return (
    <main className="relative flex flex-col items-center justify-between p-24">
      {!dao && <Daos daoSelected={(d) => setDao(d)} />}
      {dao && <Proposal dao={dao} onSubmit={() => {}} />}
    </main>
  );
}
