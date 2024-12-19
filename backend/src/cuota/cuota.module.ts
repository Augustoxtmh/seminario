import { Module } from '@nestjs/common';
import { CuotaController } from './cuota.controller';
import { CuotaService } from './cuota.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [CuotaController],
  providers: [CuotaService, PrismaService],
})
export class CuotaModule {}

