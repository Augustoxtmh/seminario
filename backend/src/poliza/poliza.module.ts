import { Module } from '@nestjs/common';
import { PolizaController } from './poliza.controller';
import { PolizaService } from './poliza.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [PolizaController],
  providers: [PolizaService, PrismaService],
})
export class PolizaModule {}

