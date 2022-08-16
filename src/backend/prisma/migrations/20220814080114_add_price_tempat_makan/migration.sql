/*
  Warnings:

  - Added the required column `price` to the `TempatMakan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TempatMakan" ADD COLUMN     "price" INTEGER NOT NULL;
