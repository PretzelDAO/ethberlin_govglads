import { NextRequest, NextResponse } from "next/server";
import { delegates } from "@/domains/mocks";
import db from "@/utils/db";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const daoId = searchParams.get("id");

//   const result = await db((client) => {
//     return client.query(`SELECT 1+1 AS result`);
//   });
//   console.log(result);

  return NextResponse.json(delegates, { status: 200 });
};