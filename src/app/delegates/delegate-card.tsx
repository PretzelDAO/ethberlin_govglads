"use client";

import Image from "next/image";
import ampelmannGreenPic from "@/images/ampelmann-green.svg";
import ampelmannRedPic from "@/images/ampelmann-red.svg";
import { useState } from "react";
import composeClassName from "@/utils/compose-class-name";

interface Props {
  name: string;
}

type Expectation = "neutral" | "for" | "against";

const DelegateCard = ({ name }: Props) => {
  const [expectation, setExpectation] = useState<Expectation>("neutral");

  const toggleExpectation = (newExpectation: Expectation) => {
    setExpectation(expectation === newExpectation ? "neutral" : newExpectation);
  };

  return (
    <div
      className={composeClassName(
        "grid",
        "grid-cols-[max-content,auto,max-content]",
        "items-center",
        "gap-10",
        "bg-slate-100",
        "px-10",
        "py-4",
        "rounded-md",
        expectation === "against" && "bg-red-100 -translate-x-10",
        expectation === "for" && "bg-green-100 translate-x-10",
        "transition-all"
      )}
    >
      <button onClick={() => toggleExpectation("against")}>
        <Image src={ampelmannRedPic} alt="" width={40} />
      </button>
      <div>{name}</div>
      <button onClick={() => toggleExpectation("for")}>
        <Image src={ampelmannGreenPic} alt="" width={40} />
      </button>
    </div>
  );
};

export default DelegateCard;
