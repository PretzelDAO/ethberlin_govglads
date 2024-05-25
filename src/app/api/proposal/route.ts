import { NextRequest, NextResponse } from "next/server";
import { proposalResponse } from "@/domains/mocks";

export const POST = async (request: NextRequest) => {
    const body = await request.json();
    return NextResponse.json(proposalResponse, { status: 200 });
};