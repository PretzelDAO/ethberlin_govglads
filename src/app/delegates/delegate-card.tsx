"use client";

import Image from "next/image";
import ampelmannGreenPic from "@/images/ampelmann-green.svg";
import ampelmannRedPic from "@/images/ampelmann-red.svg";
import { useState } from "react";
import composeClassName from "@/utils/compose-class-name";

interface Props {
  name: string;
  votingPower: number;
  state: number;
  showScore: boolean;
  onChange: (number) => void;
}

type Expectation = "neutral" | "for" | "against";

const DelegateCard = ({ name, votingPower, state, showScore, onChange }: Props) => {
  let expectation = "neutral";
  if (state < 0) {
    expectation = "against";
  } else if (state > 0) {
    expectation = "for";
  }

  const toggleExpectation = (newExpectation: Expectation) => {
    let newState = 0;
    if (newExpectation == "against") {
        newState = -1;
    } else if (newExpectation == "for") {
        newState = 1;
    }

    onChange(state === newState ? 0 : newState);
  };

  return (
    <div
      className={composeClassName(
        "grid",
        "grid-cols-[max-content,auto,max-content]",
        "items-center",
        "gap-10",
        "px-10",
        "py-4",
        "rounded-md",
        expectation === "neutral" && "bg-slate-100",
        expectation === "against" && "bg-red-100 -translate-x-10",
        expectation === "for" && "bg-green-100 translate-x-10",
        "transition-all"
      )}
    >
      <button type="button" onClick={() => toggleExpectation("against")}>
        <Image src={ampelmannRedPic} alt="" width={40} />
      </button>
      <div onClick={() => toggleExpectation("neutral")}>
        <p>{name} ({votingPower})</p>
        <p>Probability: {Math.abs(state)}%</p>
      </div>
      <button type="button" onClick={() => toggleExpectation("for")}>
        <Image src={ampelmannGreenPic} alt="" width={40} />
      </button>
    </div>
  );
};

export default DelegateCard;
