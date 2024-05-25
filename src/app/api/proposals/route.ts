import { NextResponse, type NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  return NextResponse.json({
    proposals: [],
  });
};
