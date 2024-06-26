import Image from "next/image";
import logo from "@/images/logo.png";
import "./header.scss";
import { Dao } from "@/domains/dao";
import Toggle from "./toggle";
import { NearContext } from "../contexts/WalletContext";
import { useContext, useEffect, useState } from "react";

interface Props {
  dao?: Dao;
  setBerlin: (b: boolean) => void;
  berlin: boolean;
}

export default function Header({ dao, setBerlin, berlin }: Props) {
  const { signedAccountId, wallet } = useContext(NearContext);
  const [action, setAction] = useState(() => {});
  const [label, setLabel] = useState("Loading...");

  useEffect(() => {
    if (!wallet) return;

    if (signedAccountId) {
      setAction(() => (wallet as any).signOut);
      setLabel(`Logout ${signedAccountId}`);
    } else {
      setAction(() => (wallet as any).signIn);
      setLabel("Login");
    }
  }, [signedAccountId, wallet]);

  return (
    <div className="h-[calc(56px+10px+10px)]">
      <header>
        <div className="flex flex-row justify-between">
          <div>
            <Image src={logo} alt="" height={56} />
            <h1>Governance Gladiators</h1>
            <button
              className="btn btn-secondary float-right pt-4"
              onClick={action as any}
            >
              {label}
            </button>
          </div>
          {dao && (
            <div className="welcome">
              <img className="dao-logo" src={dao.logo} alt="DAO Logo" />
              <h3>Welcome to {dao.name} Arena</h3>
            </div>
          )}

          <Toggle
            leftLabel="Berlin"
            rightLabel="Arena"
            onChange={(s) => setBerlin(s == "left")}
            state={berlin ? "left" : "right"}
          />
        </div>
      </header>
    </div>
  );
}
