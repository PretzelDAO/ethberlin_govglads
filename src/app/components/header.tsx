import Image from "next/image";
import logo from "@/images/logo.png";
import "./header.scss";
import { Dao } from "@/domains/dao";

interface Props {
    dao?: Dao;
}

export default function Header({ dao }: Props) {
  return (
    <div className="h-[calc(56px+10px+10px)]">
      <header>
        <Image src={logo} alt="" height={56} />
        <h1>Governance Gladiators</h1>
        { dao &&
            <div className="welcome">
                <img className="dao-logo" src={dao.logo} alt="DAO Logo" />
                <h3>Welcome to {dao.name} Arena</h3>
            </div>
        }
      </header>
    </div>
  );
}
