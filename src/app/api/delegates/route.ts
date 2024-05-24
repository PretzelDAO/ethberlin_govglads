import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    const searchParams = request.nextUrl.searchParams;
    const daoId = searchParams.get('id');
    console.log(daoId);
    
    return NextResponse.json({ delegates: [
        {
              name: "Delegate 1",
              votingPower: 100,
              logo: "https://avatars.githubusercontent.com/u/1",
              wallet: "tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx",
        },
        {
              name: "Delegate 2",
              votingPower: 200,
              logo: "https://avatars.githubusercontent.com/u/2",
              wallet: "tz1gjaF81ZRRvdzjobyfVNsAeSC6PScjfQwN",
        },
        {
              name: "Delegate 3",
              votingPower: 300,
              logo: "https://avatars.githubusercontent.com/u/3",
              wallet: "tz1faswCTDciRzE4oJ9jn2Vm2dvjeyA9fUzU",
        }
      ] }, { status: 200 });
};