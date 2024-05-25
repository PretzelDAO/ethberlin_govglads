import { NextRequest, NextResponse } from "next/server";
import { delegates } from "@/domains/mocks";

export const GET = async (request: NextRequest) => {
    const searchParams = request.nextUrl.searchParams;
    const daoId = searchParams.get('id');

    return NextResponse.json(delegates, { status: 200 });
};