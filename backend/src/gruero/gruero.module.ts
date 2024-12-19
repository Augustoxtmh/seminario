import { Module } from '@nestjs/common';
import { GrueroController } from './gruero.controller';
import { GrueroService } from './gruero.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [GrueroController],
  providers: [GrueroService, PrismaService],
})
export class GrueroModule {}

