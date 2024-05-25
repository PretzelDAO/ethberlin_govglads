import { NextRequest, NextResponse } from "next/server";
import { delegates } from "@/domains/mocks";
import db from "@/utils/db";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const daoId = searchParams.get("id");

  const result = await db((client) => {
    return client.query(
      `SELECT voter as wallet, vp as votingPower from arbitrum_vp`
    );
  });
  console.log(result.rows);

  return NextResponse.json(result.rows, { status: 200 });
};
