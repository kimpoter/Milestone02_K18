/*
  Warnings:

  - You are about to drop the column `paymentMethods` on the `TempatMakan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TempatMakan" DROP COLUMN "paymentMethods";

-- CreateTable
CREATE TABLE "PaymentMethod" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Platform" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Platform_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PaymentMethodToTempatMakan" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_PlatformToTempatMakan" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PaymentMethod_name_key" ON "PaymentMethod"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Platform_name_key" ON "Platform"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_PaymentMethodToTempatMakan_AB_unique" ON "_PaymentMethodToTempatMakan"("A", "B");

-- CreateIndex
CREATE INDEX "_PaymentMethodToTempatMakan_B_index" ON "_PaymentMethodToTempatMakan"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PlatformToTempatMakan_AB_unique" ON "_PlatformToTempatMakan"("A", "B");

-- CreateIndex
CREATE INDEX "_PlatformToTempatMakan_B_index" ON "_PlatformToTempatMakan"("B");

-- AddForeignKey
ALTER TABLE "_PaymentMethodToTempatMakan" ADD CONSTRAINT "_PaymentMethodToTempatMakan_A_fkey" FOREIGN KEY ("A") REFERENCES "PaymentMethod"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PaymentMethodToTempatMakan" ADD CONSTRAINT "_PaymentMethodToTempatMakan_B_fkey" FOREIGN KEY ("B") REFERENCES "TempatMakan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlatformToTempatMakan" ADD CONSTRAINT "_PlatformToTempatMakan_A_fkey" FOREIGN KEY ("A") REFERENCES "Platform"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlatformToTempatMakan" ADD CONSTRAINT "_PlatformToTempatMakan_B_fkey" FOREIGN KEY ("B") REFERENCES "TempatMakan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
