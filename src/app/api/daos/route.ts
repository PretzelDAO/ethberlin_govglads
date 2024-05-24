import { NextResponse } from "next/server";

export const GET = async () => {
    return NextResponse.json({ daos: [ 
        {
              id: 1,
              name: "DAO 1",
        },
        {
              id: 2,
              name: "DAO 2",
        },
        {
              id: 3,
              name: "DAO 3",
        }
      ] }, { status: 200 });
};