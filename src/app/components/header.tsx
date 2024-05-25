import Image from "next/image";
import logo from "@/images/logo.png";
import "./header.scss";

export default function Header() {
  return (
    <header>
      <Image src={logo} alt="" height={56} />
      <h1>Governance Gladiators</h1>
    </header>
  );
}
