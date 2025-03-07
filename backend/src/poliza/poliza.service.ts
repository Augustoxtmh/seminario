import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Poliza as PolizaModel } from '@prisma/client';

@Injectable()
export class PolizaService {
  constructor(private prisma: PrismaService) {}

  async createPoliza(data: PolizaModel): Promise<PolizaModel> {
    return this.prisma.poliza.create({
      data,
    });
  }

  async getAllPolizas(): Promise<PolizaModel[]> {
    return this.prisma.poliza.findMany({
      where: {
        DeAlta: true,
      },
    });
  }

  async getPoliza(NumeroPoliza: string): Promise<PolizaModel> {
    return this.prisma.poliza.findUnique({
      where: { 
        NumeroPoliza: NumeroPoliza,
        DeAlta: true,
      },
    });
  }

  async updatePoliza(NumeroPoliza: string, data: PolizaModel): Promise<PolizaModel> {
    return this.prisma.poliza.update({
      where: {
        NumeroPoliza: NumeroPoliza
        , DeAlta: true, },
      data,
    });
  }

  async deletePoliza(NumeroPoliza: string): Promise<PolizaModel> {
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

