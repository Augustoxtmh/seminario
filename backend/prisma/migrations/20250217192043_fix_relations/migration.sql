/*
  Warnings:

  - You are about to drop the column `Activo` on the `usuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `gruero` MODIFY `DeAlta` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `pedidogrua` MODIFY `DeAlta` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `poliza` MODIFY `DeAlta` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `Activo`,
    ADD COLUMN `DeAlta` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `vehiculo` MODIFY `DeAlta` BOOLEAN NOT NULL DEFAULT true;
