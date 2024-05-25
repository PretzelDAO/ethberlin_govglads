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
  onChange: (number: number) => void;
}

type Expectation = "neutral" | "for" | "against";

const DelegateCard = ({
  delegate,
  size,
  state,
  showScore,
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
        backgroundImage: "url(" + delegate.logo + ")",
        transform: CSS.Translate.toString(transform),
      }}
      {...listeners}
      {...attributes}
    >
      <p className="vp">
        {" "}
        ({(delegate.votingpower / 1000000).toFixed(2)} M)
        <br /> VP
      </p>
    </div>
  );
};

export default DelegateCard;
