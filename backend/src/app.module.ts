import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { VehiculoModule } from './vehiculo/vehiculo.module';
import { VehiculoService } from './vehiculo/vehiculo.service';
import { VehiculoController } from './vehiculo/vehiculo.controller';

@Module({
  imports: [PrismaModule, VehiculoModule],
  controllers: [AppController, VehiculoController],
  providers: [AppService, VehiculoService],
})
export class AppModule {}
