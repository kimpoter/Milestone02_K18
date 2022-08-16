/*
  Warnings:

  - You are about to drop the column `isVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `ChangePasswordToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserVerificationToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChangePasswordToken" DROP CONSTRAINT "ChangePasswordToken_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserVerificationToken" DROP CONSTRAINT "UserVerificationToken_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isVerified";

-- DropTable
DROP TABLE "ChangePasswordToken";

-- DropTable
DROP TABLE "UserVerificationToken";
