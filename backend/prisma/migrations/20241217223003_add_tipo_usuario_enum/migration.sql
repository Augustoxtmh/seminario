/*
  Warnings:

  - The primary key for the `usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `telefono` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `usuario` table. All the data in the column will be lost.
  - Added the required column `Contra` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Id` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Nombre` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Usuario_email_key` ON `usuario`;

-- AlterTable
ALTER TABLE `usuario` DROP PRIMARY KEY,
    DROP COLUMN `createdAt`,
    DROP COLUMN `email`,
    DROP COLUMN `id`,
    DROP COLUMN `nombre`,
    DROP COLUMN `telefono`,
    DROP COLUMN `tipo`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `Autoridad` ENUM('A', 'U') NOT NULL DEFAULT 'U',
    ADD COLUMN `Contra` VARCHAR(191) NOT NULL,
    ADD COLUMN `Id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `Nombre` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`Id`);
