/*
  Warnings:

  - You are about to drop the column `userId` on the `OTP` table. All the data in the column will be lost.
  - Added the required column `email` to the `OTP` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OTP" DROP CONSTRAINT "OTP_userId_fkey";

-- AlterTable
ALTER TABLE "OTP" DROP COLUMN "userId",
ADD COLUMN     "email" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "OTP" ADD CONSTRAINT "OTP_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
