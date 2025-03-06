import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Vehiculo } from '@prisma/client';
import { VehiculoModule } from './vehiculo.module';

@Injectable()
export class VehiculoService {
  constructor(private readonly prisma: PrismaService) {}

  async createVehiculo(data: Vehiculo) {
    return await this.prisma.vehiculo.create({data});
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

  async updateVehiculo(id: string, data: VehiculoModule): Promise<VehiculoModule> {
    return this.prisma.vehiculo.update({
      where: { Patente: id },
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
