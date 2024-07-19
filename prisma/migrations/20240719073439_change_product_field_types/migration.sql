/*
  Warnings:

  - You are about to alter the column `currentPrice` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `product` MODIFY `currentPrice` VARCHAR(191) NOT NULL,
    MODIFY `rating` VARCHAR(191) NOT NULL DEFAULT '0',
    MODIFY `totalReviews` VARCHAR(191) NOT NULL DEFAULT '0';
