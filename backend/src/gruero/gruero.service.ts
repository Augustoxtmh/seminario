import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Gruero as GrueroModel } from '@prisma/client';

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

  async getGrueroById(id: number): Promise<GrueroModel> {
    return this.prisma.gruero.findUnique({
      where: { GrueroID: id },
    });
  }

  async getGrueroByNombre(nombre: string): Promise<GrueroModel> {
    return this.prisma.gruero.findUnique({
      where: { NombreGruero: nombre },
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

