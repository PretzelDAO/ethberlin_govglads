"use client";

import Image from "next/image";
// import Daos from "@/app/daos/daos";
import Daos from "@/app/daosArena/daos";
// import Proposal from "@/app/proposal/proposal";
import Proposal from "@/app/proposalArena/proposal";
import React, { useEffect, useState } from "react";
import type { Dao } from "@/domains/dao";
import Header from "@/app/components/header";
import ArenaWrapper from "./pageWrapper/arenaWrapper";
import BerlinWrapper from "./pageWrapper/berlinWrapper";

export default function Home() {
  const [berlin, setBerlin] = useState(true);
  if (berlin) {
    return <BerlinWrapper setBerlin={setBerlin} />;
  }
  return <ArenaWrapper setBerlin={setBerlin} />;
}
