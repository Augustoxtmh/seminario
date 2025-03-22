import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Cuota, Cuota as CuotaModel } from '@prisma/client';

@Injectable()
export class CuotaService {
  constructor(private prisma: PrismaService) {}

  async createCuota(data: Cuota): Promise<Cuota> {
    return this.prisma.cuota.create({
      data,
    });
  }

  async getAllCuotas(): Promise<Cuota[]> {
    return this.prisma.cuota.findMany();
  }

  async getCuota(id: number): Promise<Cuota> {
    return this.prisma.cuota.findUnique({
      where: { cuotaId: id },
    });
  }

  async isPolizaVigente(patente: string): Promise<{ valido: boolean; errores: string[] }> {
    const errores: string[] = [];
    const hoy = new Date();
  
    const poliza = await this.prisma.poliza.findFirst({
      where: { Patente: patente },
      orderBy: { Vigencia: 'desc' },
    });
  
    if (!poliza) {
      errores.push('No existe una póliza para la patente ingresada');
      return { valido: false, errores };
    }
  
    const fechaCreacion = new Date(poliza.Vigencia);
    const diferenciaDias = Math.floor(
      (hoy.getTime() - fechaCreacion.getTime()) / (1000 * 60 * 60 * 24)
    );
  
    if (diferenciaDias < 3) {
      errores.push(`La póliza no tiene más de 3 días de vigencia (días transcurridos: ${diferenciaDias} de 3)`);
    }
  
    const cuota = await this.prisma.cuota.findFirst({
      where: { NumeroPoliza: poliza.NumeroPoliza },
      orderBy: { FechaVencimiento: 'desc' },
    });
  
    if (!cuota) {
      errores.push('No se encontraron cuotas para la póliza');
    } else {
      const fechaVencimiento = new Date(cuota.FechaVencimiento);
      if (hoy > fechaVencimiento) {
        errores.push('La última cuota está vencida');
      }
    }
  
    return {
      valido: errores.length === 0,
      errores,
    };
  }
  
  async updateCuota(data: CuotaModel): Promise<Cuota> {
    return this.prisma.cuota.update({
      where: { cuotaId: data.cuotaId },
      data,
    });
  }

  async deleteCuota(id: number): Promise<CuotaModel> {
    return this.prisma.cuota.delete({
      where: { cuotaId: id },
    });
  }
}

