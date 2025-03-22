import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { VehiculoModule } from './vehiculo/vehiculo.module';
import { VehiculoService } from './vehiculo/vehiculo.service';
import { VehiculoController } from './vehiculo/vehiculo.controller';
import { PolizaController } from './poliza/poliza.controller';
import { GrueroController } from './gruero/gruero.controller';
import { UsuarioController } from './usuario/usuario.controller';
import { PedidogruaController } from './pedidoGrua/pedidogrua.controller';
import { GrueroService } from './gruero/gruero.service';
import { PedidogruaService } from './pedidoGrua/pedidogrua.service';
import { PolizaService } from './poliza/poliza.service';
import { UsuarioService } from './usuario/usuario.service';
import { GrueroModule } from './gruero/gruero.module';
import { PedidogruaModule } from './pedidoGrua/pedidogrua.module';
import { PolizaModule } from './poliza/poliza.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { CuotaController } from './cuota/cuota.controller';
import { CuotaModule } from './cuota/cuota.module';
import { CuotaService } from './cuota/cuota.service';
import { SeederService } from './seeder/seeder.service';
import { SeederModule } from './seeder/seeder.module';

@Module({
  imports: [PrismaModule, VehiculoModule, PolizaModule, GrueroModule, UsuarioModule, CuotaModule
    , PedidogruaModule, SeederModule],
  controllers: [AppController, VehiculoController, PolizaController, GrueroController, UsuarioController
    , PedidogruaController, AuthController, CuotaController
  ],
  providers: [AppService, VehiculoService, PolizaService, GrueroService, UsuarioService
    , PedidogruaService, AuthService, CuotaService, SeederService],
})
export class AppModule {}
