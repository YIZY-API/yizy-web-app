/*
  Warnings:

  - Added the required column `userId` to the `SpecificationSnapshot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SpecificationSnapshot" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "BridgeUserAndSpecfication" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "specId" INTEGER NOT NULL,

    CONSTRAINT "BridgeUserAndSpecfication_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BridgeUserAndSpecfication" ADD CONSTRAINT "BridgeUserAndSpecfication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BridgeUserAndSpecfication" ADD CONSTRAINT "BridgeUserAndSpecfication_specId_fkey" FOREIGN KEY ("specId") REFERENCES "Specification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpecificationSnapshot" ADD CONSTRAINT "SpecificationSnapshot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
