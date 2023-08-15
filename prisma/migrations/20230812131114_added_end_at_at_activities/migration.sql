/*
  Warnings:

  - You are about to drop the column `eventId` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `ticketId` on the `Reserve_Activity` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Reserve_Activity` table. All the data in the column will be lost.
  - Added the required column `endAt` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enrollmentId` to the `Reserve_Activity` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Reserve_Activity" DROP CONSTRAINT "Reserve_Activity_ticketId_fkey";

-- DropForeignKey
ALTER TABLE "Reserve_Activity" DROP CONSTRAINT "Reserve_Activity_userId_fkey";

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "eventId",
ADD COLUMN     "endAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Reserve_Activity" DROP COLUMN "ticketId",
DROP COLUMN "userId",
ADD COLUMN     "enrollmentId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Reserve_Activity" ADD CONSTRAINT "Reserve_Activity_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "Enrollment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
