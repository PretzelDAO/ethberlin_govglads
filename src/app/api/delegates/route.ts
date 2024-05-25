import { NextRequest, NextResponse } from "next/server";
import { delegates } from "@/domains/mocks";
import db from "@/utils/db";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const daoId = searchParams.get("id");

//   const result = await db(async (client) => {
//     console.log("hi");
//     const r1 = await client.query(`SELECT max(vp) from arbitrum_vp;`);
//     const r2 = await client.query(
//       `SELECT
//         voter as wallet,
//         vp as votingPower,
//         delegate_name as name
//       from arbitrum_vp
//         left join arb_delegates on arb_delegates.delegate = arbitrum_vp.voter`
//     );
//     // join r1.rows and r2.rows
//     for (let i = 0; i < r2.rows.length; i++) {
//       r2.rows[i].maxvotingpower = r1.rows[0].max;
//     }
//     return r2;
//   });
  // console.log(result.rows);

  return NextResponse.json(delegates, { status: 200 });
};
