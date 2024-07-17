/*
  Warnings:

  - You are about to drop the column `scrapeId` on the `amazonitem` table. All the data in the column will be lost.
  - Added the required column `amazonId` to the `Scrape` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `amazonitem` DROP FOREIGN KEY `AmazonItem_scrapeId_fkey`;

-- AlterTable
ALTER TABLE `amazonitem` DROP COLUMN `scrapeId`;

-- AlterTable
ALTER TABLE `scrape` ADD COLUMN `amazonId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `isVerified` BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE `Scrape` ADD CONSTRAINT `Scrape_amazonId_fkey` FOREIGN KEY (`amazonId`) REFERENCES `AmazonItem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
