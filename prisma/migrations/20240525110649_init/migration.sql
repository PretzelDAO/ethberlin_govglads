-- CreateTable
CREATE TABLE "Proposal" (
    "id" UUID NOT NULL,
    "daoId" UUID NOT NULL,

    CONSTRAINT "Proposal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DAO" (
    "id" UUID NOT NULL,

    CONSTRAINT "DAO_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_daoId_fkey" FOREIGN KEY ("daoId") REFERENCES "DAO"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
