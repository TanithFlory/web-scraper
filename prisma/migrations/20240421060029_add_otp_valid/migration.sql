-- AlterTable
ALTER TABLE `user` ADD COLUMN `otpValid` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP + interval '600000' millisecond;
