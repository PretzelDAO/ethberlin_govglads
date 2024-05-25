"use client";

import Image from "next/image";
import { Dao } from "@/domains/dao";
import React, { useEffect, useState } from 'react';
import "./daos.scss";

const alldaos: Dao[] = [
  {
    id: "uniswap",
    name: "Uniswap",
    logo: "https://assets.coingecko.com/coins/images/12504/large/uniswap-uni.png",
  },
  {
    id: "maker-dao",
    name: "MakerDAO",
    logo: "https://assets.coingecko.com/coins/images/1364/large/Mark_Maker.png",
  },
  {
    id: "aave",
    name: "Aave",
    logo: "https://assets.coingecko.com/coins/images/12645/large/AAVE.png",
  },
  {
    id: "compound",
    name: "Compound",
    logo: "https://assets.coingecko.com/coins/images/10775/large/COMP.png",
  },
  {
    id: "sushi-swap",
    name: "SushiSwap",
    logo: "https://assets.coingecko.com/coins/images/12271/large/sushiswap-512x512.png",
  },
  {
    id: "curve-dao",
    name: "Curve DAO",
    logo: "https://assets.coingecko.com/coins/images/12124/large/Curve.png",
  },
  {
    id: "yearn-finance",
    name: "Yearn Finance",
    logo: "https://assets.coingecko.com/coins/images/11849/large/yearn-finance-yfi.png",
  },
  {
    id: "balancer",
    name: "Balancer",
    logo: "https://assets.coingecko.com/coins/images/11683/large/Balancer.png",
  },
  {
    id: "pancake-swap",
    name: "PancakeSwap",
    logo: "https://assets.coingecko.com/coins/images/12632/large/pancakeswap-cake-logo.png",
  },
];

interface DaoComponentProps {
  dao: Dao;
}

function DaoComponent(props: DaoComponentProps) {
  const dao = props.dao;
  return (
    <div className="dao">
      <img src={dao.logo} alt="Dao logo" />
      <h4>{dao.name}</h4>
    </div>
  );
}

function Daos() {
  const [daos, setDaos] = useState<Dao[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setDaos(alldaos);
    setLoading(false);
    //       fetch.get('/daos')
    //         .then(response => {
    //           setDaos(response.data);
    //           setLoading(false);
    //         })
    //         .catch(error => {
    //           setError('Failed to fetch DAOs');
    //           setLoading(false);
    //         });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="daos">
      <h2>Select your DAO:</h2>
      <div className="grid grid-cols-4 gap-4">
        {daos.map((d) => (
          <DaoComponent
            dao={d}
            key={d.id}
            // onClick={() => daoSelected(d)}
          />
        ))}
      </div>
    </div>
  );
}

export default Daos;