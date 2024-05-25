"use client";

import Image from "next/image";
import ampelmannGreenPic from "@/images/ampelmann-green.svg";
import ampelmannRedPic from "@/images/ampelmann-red.svg";
import { useState } from "react";
import composeClassName from "@/utils/compose-class-name";
import type { Delegate } from "@/domains/delegate";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  delegate: Delegate;
  state: number;
  size: number;
  showScore: boolean;
  rank: number;
  onChange: (number: number) => void;
}

type Expectation = "neutral" | "for" | "against";

const DelegateCard = ({
  delegate,
  size,
  state,
  showScore,
  rank,
  onChange,
}: Props) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: delegate.wallet,
  });

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

  const getGladiatorImage = (score) => {
    score *= 7;
    if (score >= 90) {
      return "/images/gladiators/gladiator_level10.jpg";
    } else if (score >= 70) {
      return "/images/gladiators/gladiator_level9.jpg";
    } else if (score >= 60) {
      return "/images/gladiators/gladiator_level8.jpg";
    } else if (score >= 50) {
      return "/images/gladiators/gladiator_level7.jpg";
    } else if (score >= 40) {
      return "/images/gladiators/gladiator_level6.jpg";
    } else if (score >= 30) {
      return "/images/gladiators/gladiator_level5.jpg";
    } else if (score >= 20) {
      return "/images/gladiators/gladiator_level4.jpg";
    } else if (score >= 10) {
      return "/images/gladiators/gladiator_level3.jpg";
    } else if (score >= 5) {
      return "/images/gladiators/gladiator_level2.jpg";
    } else {
      return "/images/gladiators/gladiator_level1.jpg";
    }
  };

  return (
    <div
      ref={setNodeRef}
      className={composeClassName(
        "card"
        //         "grid",
        //         "grid-cols-[max-content,auto,max-content]",
        //         "items-center",
        //         "gap-10",
        //         "px-10",
        //         "py-4",
        //         "rounded-md",
        //         expectation === "neutral" && "bg-slate-100",
        //         expectation === "against" && "bg-red-100 -translate-x-10",
        //         expectation === "for" && "bg-green-100 translate-x-10",
        //         "transition-all"
      )}
      style={{
        height: size,
        width: size,
        backgroundImage: `url(${getGladiatorImage(rank)}`,
        transform: CSS.Translate.toString(transform),
      }}
      {...listeners}
      {...attributes}
    >
      <div className="vp">
        ({(delegate.votingpower / 1000000).toFixed(2)} M)
      </div>
      <div className="vp2">
        {delegate.name?.startsWith('0x') ? (delegate.name?.substring(0,6)+"...") : (delegate.name?.split(' ')[0] || `${delegate.wallet.substring(0,6)}...`)}
      </div>
      
    </div>
  );
};

export default DelegateCard;
