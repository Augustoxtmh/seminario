import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { VehiculoModule } from '../vehiculo/vehiculo.module';
import { UsuarioModule } from '../usuario/usuario.module';
import { GrueroModule } from '../gruero/gruero.module';
import { PolizaModule } from '../poliza/poliza.module';
import { CuotaModule } from 'src/cuota/cuota.module';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
  imports: [VehiculoModule, UsuarioModule, GrueroModule, PolizaModule, CuotaModule],
})
export class PrismaModule {}

