import { NextResponse } from "next/server";
import { daos } from "@/domains/mocks";

export const GET = async () => {
    return NextResponse.json(daos, { status: 200 });
};