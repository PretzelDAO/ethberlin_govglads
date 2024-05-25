import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  console.log("hello");
};

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
