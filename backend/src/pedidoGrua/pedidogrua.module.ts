import { Module } from '@nestjs/common';
import { PedidogruaController } from './pedidogrua.controller';
import { PedidogruaService } from './pedidogrua.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [PedidogruaController],
  providers: [PedidogruaService, PrismaService],
})
export class PedidogruaModule {}

