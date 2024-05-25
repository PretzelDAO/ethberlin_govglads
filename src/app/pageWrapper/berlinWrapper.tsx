"use client";

import Image from "next/image";
// import Daos from "@/app/daos/daos";
import Daos from "@/app/daos/daos";
// import Proposal from "@/app/proposal/proposal";
import Proposal from "@/app/proposal/proposal";
import React, { useEffect, useState } from "react";
import type { Dao } from "@/domains/dao";
import Header from "@/app/components/header";

export default function BerlinWrapper({
  setBerlin,
}: {
  setBerlin: (b: boolean) => void;
}) {
  const [dao, setDao] = useState<Dao | undefined>(undefined);
  return (
    <main
      className="min-h-screen items-center justify-between bg-fixed bg-cover bg-center md:bg-blend-darken"
      style={{ backgroundImage: "url('/berlin-bg.png')" }}
    >
      <Header dao={dao} setBerlin={setBerlin} berlin />
      {!dao && <Daos daoSelected={(d) => setDao(d)} />}
      {dao && <Proposal dao={dao} onSubmit={() => {}} />}
    </main>
  );
}
