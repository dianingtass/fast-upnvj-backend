/*
  Warnings:

  - You are about to drop the column `prodi` on the `user` table. All the data in the column will be lost.
  - Added the required column `id` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `program_studi` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `prodi`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `program_studi` VARCHAR(191) NOT NULL,
    ADD COLUMN `role` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);
