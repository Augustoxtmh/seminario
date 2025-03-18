-- CreateTable
CREATE TABLE `Gruero` (
    `GrueroID` INTEGER NOT NULL AUTO_INCREMENT,
    `NombreGruero` VARCHAR(191) NOT NULL,
    `TelefonoGruero` VARCHAR(191) NOT NULL,
    `DeAlta` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Gruero_NombreGruero_key`(`NombreGruero`),
    PRIMARY KEY (`GrueroID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PedidoGrua` (
    `PedidoID` INTEGER NOT NULL AUTO_INCREMENT,
    `UsuarioId` INTEGER NOT NULL,
    `FechaHoraPedido` DATETIME(3) NOT NULL,
    `NombreCliente` VARCHAR(191) NOT NULL,
    `GrueroID` INTEGER NOT NULL,
    `Patente` VARCHAR(191) NOT NULL,
    `urlFactura` VARCHAR(191) NULL,
    `DeAlta` BOOLEAN NOT NULL DEFAULT true,
    `Monto` INTEGER NOT NULL,

    PRIMARY KEY (`PedidoID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vehiculo` (
    `Patente` VARCHAR(191) NOT NULL,
    `Nombre` VARCHAR(191) NOT NULL,
    `Marca` VARCHAR(191) NOT NULL,
    `Color` VARCHAR(191) NOT NULL,
    `TipoPlan` VARCHAR(191) NOT NULL,
    `Modelo` VARCHAR(191) NOT NULL,
    `DeAlta` BOOLEAN NOT NULL DEFAULT true,
    `UsuarioId` INTEGER NOT NULL,

    PRIMARY KEY (`Patente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cuota` (
    `cuotaId` INTEGER NOT NULL AUTO_INCREMENT,
    `NumCuota` INTEGER NOT NULL,
    `FechaVencimiento` DATETIME(3) NOT NULL,
    `Monto` DOUBLE NOT NULL,
    `NumeroPoliza` VARCHAR(191) NOT NULL,
    `UsuarioId` INTEGER NOT NULL,

    PRIMARY KEY (`cuotaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Poliza` (
    `NumeroPoliza` VARCHAR(191) NOT NULL,
    `Vigencia` DATETIME(3) NOT NULL,
    `Telefono` VARCHAR(191) NOT NULL,
    `DeAlta` BOOLEAN NOT NULL DEFAULT true,
    `Patente` VARCHAR(191) NOT NULL,
    `UsuarioId` INTEGER NOT NULL,

    UNIQUE INDEX `Poliza_Patente_key`(`Patente`),
    PRIMARY KEY (`NumeroPoliza`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `UsuarioId` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` VARCHAR(191) NOT NULL,
    `Contra` VARCHAR(191) NOT NULL,
    `Autoridad` ENUM('A', 'U') NOT NULL DEFAULT 'U',
    `DeAlta` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`UsuarioId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PedidoGrua` ADD CONSTRAINT `PedidoGrua_GrueroID_fkey` FOREIGN KEY (`GrueroID`) REFERENCES `Gruero`(`GrueroID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PedidoGrua` ADD CONSTRAINT `PedidoGrua_UsuarioId_fkey` FOREIGN KEY (`UsuarioId`) REFERENCES `Usuario`(`UsuarioId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vehiculo` ADD CONSTRAINT `Vehiculo_UsuarioId_fkey` FOREIGN KEY (`UsuarioId`) REFERENCES `Usuario`(`UsuarioId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cuota` ADD CONSTRAINT `Cuota_NumeroPoliza_fkey` FOREIGN KEY (`NumeroPoliza`) REFERENCES `Poliza`(`NumeroPoliza`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cuota` ADD CONSTRAINT `Cuota_UsuarioId_fkey` FOREIGN KEY (`UsuarioId`) REFERENCES `Usuario`(`UsuarioId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Poliza` ADD CONSTRAINT `Poliza_Patente_fkey` FOREIGN KEY (`Patente`) REFERENCES `Vehiculo`(`Patente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Poliza` ADD CONSTRAINT `Poliza_UsuarioId_fkey` FOREIGN KEY (`UsuarioId`) REFERENCES `Usuario`(`UsuarioId`) ON DELETE RESTRICT ON UPDATE CASCADE;
