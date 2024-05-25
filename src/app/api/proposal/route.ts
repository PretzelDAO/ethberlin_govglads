import { NextRequest, NextResponse } from "next/server";
import { proposalResponse } from "@/domains/mocks";

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  console.log("body", body);
  const delegates = body.delegates;
  fetch("https://fba38e3e6170.ngrok.app/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ delegates }),
  });
  return NextResponse.json(proposalResponse, { status: 200 });
};
