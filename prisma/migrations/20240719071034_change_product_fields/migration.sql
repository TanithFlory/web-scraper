/*
  Warnings:

  - You are about to drop the column `description` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `latestPrice` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `otpId` on the `user` table. All the data in the column will be lost.
  - Added the required column `currentPrice` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalReviews` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `otp` DROP FOREIGN KEY `OTP_userId_fkey`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `description`,
    DROP COLUMN `imageUrl`,
    DROP COLUMN `latestPrice`,
    ADD COLUMN `currentPrice` DOUBLE NOT NULL,
    ADD COLUMN `image` VARCHAR(191) NOT NULL,
    ADD COLUMN `rating` INTEGER NOT NULL,
    ADD COLUMN `totalReviews` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `otpId`;

-- AddForeignKey
ALTER TABLE `otp` ADD CONSTRAINT `otp_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `otp` RENAME INDEX `OTP_userId_key` TO `otp_userId_key`;
