import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Poliza } from '@prisma/client';

@Injectable()
export class PolizaService {
  constructor(private prisma: PrismaService) {}

  async createPoliza(data: Poliza): Promise<Poliza> {
    return this.prisma.poliza.create({
      data,
    });
  }

  async getAllPolizas(): Promise<Poliza[]> {
    return this.prisma.poliza.findMany({
      where: {
        DeAlta: true,
      },
    });
  }

  async getPoliza(NumeroPoliza: string): Promise<Poliza | null> {
    return this.prisma.poliza.findFirst({
      where: { 
        NumeroPoliza,
        DeAlta: true,
      },
    });
  }

  async getPolizaPorNPoliza(NPoliza: number): Promise<Poliza | null> {
    return this.prisma.poliza.findFirst({
      where: { 
        NumeroPoliza: NPoliza.toString(),
        DeAlta: true,
      },
    });
  }

  async getPolizasPorNPoliza(NPoliza: number): Promise<string[]> {
    const polizas = await this.prisma.poliza.findMany({
      where: {
        NumeroPoliza: {
          startsWith: NPoliza.toString(),
        },
        DeAlta: true
      },
      select: {
        NumeroPoliza: true,
      },
      take: 7,
    });

    return polizas.map(v => v.NumeroPoliza);
  }

  async updatePoliza(data: Poliza, VPoliza: string): Promise<Poliza> {
    const updatedPoliza = await this.prisma.poliza.update({
      where: {
        NumeroPoliza: VPoliza,
      },
      data: {
        ...data,
        NumeroPoliza: data.NumeroPoliza,
      },
    });
  

    const polizaExistente = await this.prisma.poliza.findUnique({
      where: {
        NumeroPoliza: data.NumeroPoliza,
      },
    });

    if (!polizaExistente) {
      throw new Error(`La póliza con el número ${VPoliza} asa ${data.NumeroPoliza}  no existe.`);
    }

    // Solo actualiza las cuotas si el NumeroPoliza cambió y existe
    await this.prisma.cuota.updateMany({
      where: {
        NumeroPoliza: VPoliza,
      },
      data: {
        NumeroPoliza: data.NumeroPoliza,  // Se actualiza a la nueva póliza
      },
    });
    
  
    return updatedPoliza;
  }
  

  async deletePoliza(NumeroPoliza: string): Promise<Poliza> {
    return this.prisma.poliza.update({
      where: { 
        NumeroPoliza: NumeroPoliza,
      },
      data: {
        DeAlta: false,
      },
    });
  }
}
