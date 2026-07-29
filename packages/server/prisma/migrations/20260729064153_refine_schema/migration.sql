/*
  Warnings:

  - You are about to alter the column `rating` on the `review` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.

*/
-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_productId_fkey`;

-- DropForeignKey
ALTER TABLE `summary` DROP FOREIGN KEY `Summary_productId_fkey`;

-- AlterTable
ALTER TABLE `product` MODIFY `name` VARCHAR(255) NOT NULL,
    MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `review` MODIFY `author` VARCHAR(255) NOT NULL,
    MODIFY `rating` TINYINT NOT NULL,
    MODIFY `content` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `summary` MODIFY `content` TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `summary` ADD CONSTRAINT `summary_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `summary` RENAME INDEX `Summary_productId_key` TO `summary_productId_key`;
