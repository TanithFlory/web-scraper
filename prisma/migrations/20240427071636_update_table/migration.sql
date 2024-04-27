/*
  Warnings:

  - You are about to drop the column `amazonId` on the `scrape` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `scrape` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `scrape` table. All the data in the column will be lost.
  - You are about to drop the column `otp` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `otpValid` on the `user` table. All the data in the column will be lost.
  - Added the required column `scrapeId` to the `AmazonItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Scrape` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `scrape` DROP FOREIGN KEY `Scrape_amazonId_fkey`;

-- DropForeignKey
ALTER TABLE `scrape` DROP FOREIGN KEY `Scrape_authorId_fkey`;

-- AlterTable
ALTER TABLE `amazonitem` ADD COLUMN `scrapeId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `scrape` DROP COLUMN `amazonId`,
    DROP COLUMN `authorId`,
    DROP COLUMN `url`,
    ADD COLUMN `scrapedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `otp`,
    DROP COLUMN `otpValid`;

-- CreateTable
CREATE TABLE `OTP` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `otp` INTEGER NOT NULL,
    `otpValidity` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `OTP_otp_key`(`otp`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Scrape` ADD CONSTRAINT `Scrape_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AmazonItem` ADD CONSTRAINT `AmazonItem_scrapeId_fkey` FOREIGN KEY (`scrapeId`) REFERENCES `Scrape`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OTP` ADD CONSTRAINT `OTP_otp_fkey` FOREIGN KEY (`otp`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
