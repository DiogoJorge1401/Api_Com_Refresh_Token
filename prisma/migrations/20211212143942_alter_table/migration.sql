/*
  Warnings:

  - Made the column `token` on table `refresh_token` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `refresh_token` MODIFY `token` VARCHAR(191) NOT NULL;
