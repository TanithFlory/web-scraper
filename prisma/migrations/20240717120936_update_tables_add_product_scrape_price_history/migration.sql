/*
  Warnings:

  - You are about to drop the column `amazonId` on the `scrape` table. All the data in the column will be lost.
  - You are about to drop the `amazonitem` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `productId` to the `Scrape` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `scrape` DROP FOREIGN KEY `Scrape_amazonId_fkey`;

-- AlterTable
ALTER TABLE `scrape` DROP COLUMN `amazonId`,
    ADD COLUMN `productId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `amazonitem`;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `latestPrice` DOUBLE NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `scrapeCount` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `Product_productId_key`(`productId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PriceHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Scrape` ADD CONSTRAINT `Scrape_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`productId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PriceHistory` ADD CONSTRAINT `PriceHistory_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`productId`) ON DELETE RESTRICT ON UPDATE CASCADE;
