import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { poliza as PolizaModel } from '@prisma/client';

@Injectable()
export class PolizaService {
  constructor(private prisma: PrismaService) {}

  async createPoliza(data: PolizaModel): Promise<PolizaModel> {
    return this.prisma.poliza.create({
      data,
    });
  }

  async getAllPolizas(): Promise<PolizaModel[]> {
    return this.prisma.poliza.findMany();
  }

  async getPoliza(id: number): Promise<PolizaModel> {
    return this.prisma.poliza.findUnique({
      where: { NumeroPoliza: id },
    });
  }

  async updatePoliza(id: number, data: PolizaModel): Promise<PolizaModel> {
    return this.prisma.poliza.update({
      where: { NumeroPoliza: id },
      data,
    });
  }

  async deletePoliza(id: number): Promise<PolizaModel> {
    return this.prisma.poliza.delete({
      where: { NumeroPoliza: id },
    });
  }
}

