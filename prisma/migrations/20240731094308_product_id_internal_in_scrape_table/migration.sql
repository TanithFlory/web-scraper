/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Scrape` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[productId]` on the table `Scrape` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `productId` on the `Scrape` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Scrape" DROP CONSTRAINT "Scrape_productId_fkey";

-- AlterTable
ALTER TABLE "Scrape" DROP COLUMN "productId",
ADD COLUMN     "productId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Scrape_userId_key" ON "Scrape"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Scrape_productId_key" ON "Scrape"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Scrape_userId_productId_key" ON "Scrape"("userId", "productId");

-- AddForeignKey
ALTER TABLE "Scrape" ADD CONSTRAINT "Scrape_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
