-- CreateTable
CREATE TABLE `cuota` (
    `NumCuota` INTEGER NOT NULL,
    `FechaVencimiento` DATE NULL,
    `Monto` DECIMAL(10, 2) NULL,
    `PedidoID` INTEGER NULL,

    INDEX `PedidoID`(`PedidoID`),
    PRIMARY KEY (`NumCuota`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `gruero` (
    `GrueroID` INTEGER NOT NULL,
    `NombreGruero` VARCHAR(50) NULL,
    `TelefonoGruero` VARCHAR(15) NULL,

    PRIMARY KEY (`GrueroID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `gruero_pedidogrua` (
    `GrueroID` INTEGER NOT NULL,
    `PedidoID` INTEGER NOT NULL,

    INDEX `PedidoID`(`PedidoID`),
    PRIMARY KEY (`GrueroID`, `PedidoID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pedidogrua` (
    `PedidoID` INTEGER NOT NULL,
    `FechaHoraPedido` DATETIME(0) NULL,
    `NombreCliente` VARCHAR(50) NULL,
    `Patente` VARCHAR(10) NULL,

    INDEX `Patente`(`Patente`),
    PRIMARY KEY (`PedidoID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `poliza` (
    `NumeroPoliza` INTEGER NOT NULL,
    `Vigencia` DATE NULL,
    `Telefono` VARCHAR(15) NULL,
    `Patente` VARCHAR(10) NULL,

    INDEX `Patente`(`Patente`),
    PRIMARY KEY (`NumeroPoliza`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vehiculo` (
    `Patente` VARCHAR(10) NOT NULL,
    `Marca` VARCHAR(50) NULL,
    `Color` VARCHAR(30) NULL,
    `TipoPlan` VARCHAR(20) NULL,
    `Modelo` VARCHAR(50) NULL,

    PRIMARY KEY (`Patente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cuota` ADD CONSTRAINT `cuota_ibfk_1` FOREIGN KEY (`PedidoID`) REFERENCES `pedidogrua`(`PedidoID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `gruero_pedidogrua` ADD CONSTRAINT `gruero_pedidogrua_ibfk_1` FOREIGN KEY (`GrueroID`) REFERENCES `gruero`(`GrueroID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `gruero_pedidogrua` ADD CONSTRAINT `gruero_pedidogrua_ibfk_2` FOREIGN KEY (`PedidoID`) REFERENCES `pedidogrua`(`PedidoID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `pedidogrua` ADD CONSTRAINT `pedidogrua_ibfk_1` FOREIGN KEY (`Patente`) REFERENCES `vehiculo`(`Patente`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `poliza` ADD CONSTRAINT `poliza_ibfk_1` FOREIGN KEY (`Patente`) REFERENCES `vehiculo`(`Patente`) ON DELETE RESTRICT ON UPDATE RESTRICT;
