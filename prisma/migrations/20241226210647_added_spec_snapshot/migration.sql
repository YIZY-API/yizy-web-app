-- CreateTable
CREATE TABLE "Specification" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Specification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpecificationSnapshot" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "specId" INTEGER NOT NULL,
    "prevSnapshotId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "versionNum" INTEGER NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "SpecificationSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SpecificationSnapshot_prevSnapshotId_key" ON "SpecificationSnapshot"("prevSnapshotId");

-- AddForeignKey
ALTER TABLE "SpecificationSnapshot" ADD CONSTRAINT "SpecificationSnapshot_specId_fkey" FOREIGN KEY ("specId") REFERENCES "Specification"("id") ON DELETE CASCADE ON UPDATE CASCADE;
