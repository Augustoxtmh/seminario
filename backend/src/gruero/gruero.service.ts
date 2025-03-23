import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Gruero } from '@prisma/client';

@Injectable()
export class GrueroService {
  constructor(private prisma: PrismaService) {}

  async createGruero(data: Gruero): Promise<Gruero> {
    try {
      const existingGruero = await this.prisma.gruero.findUnique({
        where: { NombreGruero: data.NombreGruero },
      });
  
      if (existingGruero) {
        if (!existingGruero.DeAlta) {
          return await this.prisma.gruero.update({
            where: { NombreGruero: data.NombreGruero },
            data: { DeAlta: true, NombreGruero: data.NombreGruero },
          });
        }
        throw new Error('P2002');
      }
        return await this.prisma.gruero.create({ data });
    } catch (error) {
      if (error.code === 'P2002' || error.message === 'P2002') {
        throw new Error('El gruero ya está registrado.');
      }
      throw new Error('Error al crear el gruero.');
    }
  }
  

  async getAllGrueros(): Promise<Gruero[]> {
    return this.prisma.gruero.findMany();
  }

  async getGrueroById(id: number): Promise<Gruero> {
    return this.prisma.gruero.findUnique({
      where: { GrueroID: id },
    });
  }

  async getGrueroByNombre(nombre: string): Promise<Gruero> {
    return this.prisma.gruero.findUnique({
      where: { NombreGruero: nombre },
    });
  }

  async updateGruero(data: Gruero): Promise<Gruero> {
    return this.prisma.gruero.update({
      where: { GrueroID: data.GrueroID },
      data,
    });
  }

  async deleteGruero(id: number): Promise<Gruero> {
    return this.prisma.gruero.update({
      where: { GrueroID: id },
      data: {
        DeAlta: false
      }
    });
  }
}

