/*
  Warnings:

  - You are about to drop the column `userId` on the `SpecificationSnapshot` table. All the data in the column will be lost.
  - Added the required column `creatorId` to the `SpecificationSnapshot` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SpecificationSnapshot" DROP CONSTRAINT "SpecificationSnapshot_userId_fkey";

-- AlterTable
ALTER TABLE "SpecificationSnapshot" DROP COLUMN "userId",
ADD COLUMN     "creatorId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "SpecificationSnapshot" ADD CONSTRAINT "SpecificationSnapshot_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
