/*
  Warnings:

  - You are about to drop the column `description` on the `Category` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "description";

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");
