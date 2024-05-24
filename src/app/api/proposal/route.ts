import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    const body = await request.json();
    console.log(body);

    return NextResponse.json({
        score: 0.5,
        delegates: [
            {
                    wallet: "tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx",
                    probability: 0.5
            },
            {
                    wallet: "tz1gjaF81ZRRvdzjobyfVNsAeSC6PScjfQwN",
                    probability: 0.3
            },
            {
                    wallet: "tz1faswCTDciRzE4oJ9jn2Vm2dvjeyA9fUzU",
                    probability: -0.2
            }
        ]
    }, { status: 200 });
};