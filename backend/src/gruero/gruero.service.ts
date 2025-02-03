import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { gruero as GrueroModel } from '@prisma/client';

@Injectable()
export class GrueroService {
  constructor(private prisma: PrismaService) {}

  async createGruero(data: GrueroModel): Promise<GrueroModel> {
    return this.prisma.gruero.create({
      data,
    });
  }

  async getAllGrueros(): Promise<GrueroModel[]> {
    return this.prisma.gruero.findMany();
  }

  async getGruero(id: number): Promise<GrueroModel> {
    return this.prisma.gruero.findUnique({
      where: { GrueroID: id },
    });
  }

  async updateGruero(id: number, data: GrueroModel): Promise<GrueroModel> {
    return this.prisma.gruero.update({
      where: { GrueroID: id },
      data,
    });
  }

  async deleteGruero(id: number): Promise<GrueroModel> {
    return this.prisma.gruero.delete({
      where: { GrueroID: id },
    });
  }
}

