/*
  Warnings:

  - You are about to drop the column `scrapedAt` on the `scrape` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,productId]` on the table `Scrape` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Scrape` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `scrape` DROP COLUMN `scrapedAt`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Scrape_userId_productId_key` ON `Scrape`(`userId`, `productId`);
