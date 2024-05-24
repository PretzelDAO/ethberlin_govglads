import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    const body = await request.json();
    console.log({ body });

    // Do something

    return NextResponse.json({ message: 'Submission successful' }, { status: 200 });
};