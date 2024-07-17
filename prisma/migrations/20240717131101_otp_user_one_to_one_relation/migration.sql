/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `OTP` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imageUrl` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` ADD COLUMN `imageUrl` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `otpId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `OTP_userId_key` ON `OTP`(`userId`);
