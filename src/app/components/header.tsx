'use client';

import Image from "next/image";
import logo from "@/images/logo.png";
import "./header.scss";
import { useContext, useEffect, useState } from "react";
import { NearContext } from "../contexts/WalletContext";

export default function Header() {
  const { signedAccountId, wallet } = useContext(NearContext);
  const [action, setAction] = useState(() => { });
  const [label, setLabel] = useState('Loading...');

  useEffect(() => {
    if (!wallet) return;

    if (signedAccountId) {
      setAction(() => (wallet as any).signOut);
      setLabel(`Logout ${signedAccountId}`);
    } else {
      setAction(() => (wallet as any).signIn);
      setLabel('Login');
    }
  }, [signedAccountId, wallet]);

  return (
    <header className="shadow-lg">
      <Image src={logo} alt="" height={56} />
      <h1>Governance Gladiators</h1>
      <button className="btn btn-secondary float-right pt-4" onClick={action as any} > {label} </button>
    </header>
  );
}
