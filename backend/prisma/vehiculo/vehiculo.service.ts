import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { vehiculo } from '@prisma/client';

@Injectable()
export class VehiculoService {
  constructor(private readonly prisma: PrismaService) {}

  async createVehiculo(data: vehiculo) {
    return await this.prisma.vehiculo.create({data});
  }

  async getVehiculos(): Promise<vehiculo[]> {
    return await this.prisma.vehiculo.findMany();
  }

  async getVehiculoByPatente(Patente: string): Promise<vehiculo> {
    return await this.prisma.vehiculo.findUnique({
      where: {
        Patente
      }
    })
  }

  async unableVehiculoByPatente(Patente: string): Promise<vehiculo> {
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
