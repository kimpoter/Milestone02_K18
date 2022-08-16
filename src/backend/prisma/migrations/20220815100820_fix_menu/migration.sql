/*
  Warnings:

  - You are about to drop the column `like` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail` on the `Menu` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Menu" DROP COLUMN "like",
DROP COLUMN "name",
DROP COLUMN "price",
DROP COLUMN "thumbnail",
ADD COLUMN     "imageUrl" TEXT;
