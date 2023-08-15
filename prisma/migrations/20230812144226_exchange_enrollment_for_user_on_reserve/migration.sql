/*
  Warnings:

  - You are about to drop the column `enrollmentId` on the `Reserve_Activity` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Reserve_Activity` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Reserve_Activity" DROP CONSTRAINT "Reserve_Activity_enrollmentId_fkey";

-- AlterTable
ALTER TABLE "Reserve_Activity" DROP COLUMN "enrollmentId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Reserve_Activity" ADD CONSTRAINT "Reserve_Activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
