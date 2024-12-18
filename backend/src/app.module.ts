import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../prisma/prisma.module';
import { VehiculoModule } from '../prisma/vehiculo/vehiculo.module';
import { VehiculoService } from '../prisma/vehiculo/vehiculo.service';
import { VehiculoController } from '../prisma/vehiculo/vehiculo.controller';

@Module({
  imports: [PrismaModule, VehiculoModule],
  controllers: [AppController, VehiculoController],
  providers: [AppService, VehiculoService],
})
export class AppModule {}
