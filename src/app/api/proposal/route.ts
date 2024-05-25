import { NextRequest, NextResponse } from "next/server";
// import { proposalResponse } from "@/domains/mocks";

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  console.log("body", body);
  const delegates = body.delegates;
  const res = await fetch("https://fba38e3e6170.ngrok.app/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ delegates }),
  });
  const proposalResponse = await res.json();
  console.log("proposalResponse", proposalResponse);
  const dels = JSON.parse(proposalResponse.delegates);
  console.log("dels", dels);

  return NextResponse.json(
    { score: proposalResponse.score, probabilities: dels },
    { status: 200 }
  );
};
