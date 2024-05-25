"use client";

import Image from "next/image";
import { Dao } from "@/domains/dao";
import React, { useEffect, useState } from 'react';
import "./daos.scss";
import { getDaos } from "@/app/services";
import Loading from "@/app/components/loading";

interface DaoComponentProps {
  dao: Dao;
  onClick: () => void;
}

function DaoComponent({ dao, onClick }: DaoComponentProps) {
  return (
    <div className="dao" onClick={onClick}>
      <img src={dao.logo} alt="Dao logo" />
      <h4>{dao.name}</h4>
    </div>
  );
}

interface DaosProps {
    daoSelected: (dao: Dao) => void;
}

function Daos({ daoSelected }: DaosProps) {
  const [daos, setDaos] = useState<Dao[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getDaos().then(daos => {
      setDaos(daos);
      setLoading(false);
    }).catch(error => {
      setError('Failed to fetch DAOs');
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loading msg="Loading DAOs"/>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="daos">
      <h2>Enter your Arena</h2>
      <div className="grid grid-cols-4 gap-10">
        {daos.map((d) => (
          <DaoComponent
            dao={d}
            key={d.id}
            onClick={() => daoSelected(d)}
          />
        ))}
      </div>
    </div>
  );
}

export default Daos;