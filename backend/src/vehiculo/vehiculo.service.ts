import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Vehiculo } from '@prisma/client';

@Injectable()
export class VehiculoService {
  constructor(private readonly prisma: PrismaService) {}

  async createVehiculo(data: Vehiculo) {
    try {
      return await this.prisma.vehiculo.create({ data });
    } catch (error) {
      if (error.code === 'P2002') {
        const vehiculoExistente = await this.prisma.vehiculo.findUnique({
          where: { Patente: data.Patente }
        });
  
        if (vehiculoExistente && vehiculoExistente.DeAlta === false) {
          return await this.prisma.vehiculo.update({
            where: { Patente: data.Patente },
            data: { DeAlta: true, ...data },
          });
        }
      }
  
      throw error;
    }
  }  

  async getVehiculos(): Promise<Vehiculo[]> {
    return await this.prisma.vehiculo.findMany({
      where: {
        DeAlta: true,
      },
    });
  }

  async getVehiculoByPatente(Patente: string): Promise<Vehiculo> {
    return await this.prisma.vehiculo.findUnique({
      where: {
        Patente,
        DeAlta: true,
      }
    })
  }

  async getVehiculosByPatente(Patente: string): Promise<string[]> {
    const vehiculos = await this.prisma.vehiculo.findMany({
      where: {
        Patente: {
          startsWith: Patente,
        },
        DeAlta: true
      },
      select: {
        Patente: true,
      },
      take: 7,
    });
  
    return vehiculos.map(v => v.Patente);
  }

  async updateVehiculo(data: Vehiculo): Promise<Vehiculo> {
    return this.prisma.vehiculo.update({
      where: { Patente: data.Patente },
      data,
    });
  }

  async unableVehiculoByPatente(Patente: string): Promise<Vehiculo> {
    return await this.prisma.vehiculo.update({
      where: {
        Patente,
      },
      data: {
        DeAlta: false,
      },
    });
  } 
}
