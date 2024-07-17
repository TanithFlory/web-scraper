/*
  Warnings:

  - You are about to drop the column `otp` on the `otp` table. All the data in the column will be lost.
  - You are about to drop the column `otpValidity` on the `otp` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `code` to the `OTP` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiresAt` to the `OTP` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `OTP` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `otp` DROP FOREIGN KEY `OTP_otp_fkey`;

-- DropForeignKey
ALTER TABLE `scrape` DROP FOREIGN KEY `Scrape_userId_fkey`;

-- AlterTable
ALTER TABLE `otp` DROP COLUMN `otp`,
    DROP COLUMN `otpValidity`,
    ADD COLUMN `code` INTEGER NOT NULL,
    ADD COLUMN `expiresAt` DATETIME(3) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `scrape` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `OTP` ADD CONSTRAINT `OTP_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Scrape` ADD CONSTRAINT `Scrape_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
