import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { VehiculoModule } from '../vehiculo/vehiculo.module';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
  imports: [VehiculoModule]
})
export class PrismaModule {}
