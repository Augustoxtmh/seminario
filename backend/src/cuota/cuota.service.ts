import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { cuota as CuotaModel } from '@prisma/client';

@Injectable()
export class CuotaService {
  constructor(private prisma: PrismaService) {}

  async createCuota(data: CuotaModel): Promise<CuotaModel> {
    return this.prisma.cuota.create({
      data,
    });
  }

  async getAllCuotas(): Promise<CuotaModel[]> {
    return this.prisma.cuota.findMany();
  }

  async getCuota(id: number): Promise<CuotaModel> {
    return this.prisma.cuota.findUnique({
      where: { NumCuota: id },
    });
  }

  async updateCuota(id: number, data: CuotaModel): Promise<CuotaModel> {
    return this.prisma.cuota.update({
      where: { NumCuota: id },
      data,
    });
  }

  async deleteCuota(id: number): Promise<CuotaModel> {
    return this.prisma.cuota.delete({
      where: { NumCuota: id },
    });
  }
}

