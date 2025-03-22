import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [SeederService, PrismaService],
})
export class SeederModule {}
