import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function Home() {
  const proposals = await prisma.proposal.findMany();

  return proposals.map((proposal) => (
    <div key={proposal.id}>{proposal.id}</div>
  ));
}
