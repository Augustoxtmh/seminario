/*
  Warnings:

  - A unique constraint covering the columns `[NombreGruero]` on the table `Gruero` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Gruero_NombreGruero_key` ON `Gruero`(`NombreGruero`);
