"use client";

import Image from "next/image";
import ampelmannGreenPic from "@/images/ampelmann-green.svg";
import ampelmannRedPic from "@/images/ampelmann-red.svg";
import ccn from "@/utils/compose-class-name";
import VotingPowerBar from "./voting-power-bar";
import { makeNiceAddress } from "@/utils/stringutils";

interface Props {
  name?: string;
  wallet: string;
  votingPower: number;
  maxvotingpower: number;
  state: number;
  showScore: boolean;
  onChange: (number: number) => void;
}

type Expectation = "neutral" | "for" | "against";

const DelegateCard = ({
  name,
  votingPower,
  maxvotingpower,
  state,
  wallet,
  showScore,
  onChange,
}: Props) => {
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
      className={ccn(
        "rounded-md",
        "overflow-hidden",
        expectation === "neutral" && "bg-slate-100",
        expectation === "against" && "bg-red-100 -translate-x-10",
        expectation === "for" && "bg-green-100 translate-x-10",
        "transition-all"
      )}
    >
      <div className="px-10 py-4 grid grid-cols-[max-content,auto,max-content] items-center gap-10">
        <button type="button" onClick={() => toggleExpectation("against")}>
          <Image src={ampelmannRedPic} alt="" width={40} />
        </button>
        <div onClick={() => toggleExpectation("neutral")}>
          <p>
            {name ?? makeNiceAddress(wallet)} ({Math.round(votingPower / 1000)}
            k)
          </p>
          <p>Probability: {Math.ceil(Math.abs(state)*100)}%</p>
        </div>
        <button type="button" onClick={() => toggleExpectation("for")}>
          <Image src={ampelmannGreenPic} alt="" width={40} />
        </button>
      </div>
      <VotingPowerBar fill={(votingPower/maxvotingpower)} />
    </div>
  );
};

export default DelegateCard;
