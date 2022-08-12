/*
  Warnings:

  - You are about to drop the `TempatMakanImages` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `campus` to the `TempatMakan` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Campus" AS ENUM ('GANESHA', 'JATINANGOR');

-- DropForeignKey
ALTER TABLE "TempatMakanImages" DROP CONSTRAINT "TempatMakanImages_tempatMakanId_fkey";

-- AlterTable
ALTER TABLE "TempatMakan" ADD COLUMN     "campus" "Campus" NOT NULL;

-- DropTable
DROP TABLE "TempatMakanImages";
