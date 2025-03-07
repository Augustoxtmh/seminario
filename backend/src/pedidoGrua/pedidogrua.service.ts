import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PedidoGrua as PedidogruaModel } from '@prisma/client';

@Injectable()
export class PedidogruaService {
  constructor(private prisma: PrismaService) {}

  async createPedidogrua(data: PedidogruaModel): Promise<PedidogruaModel> {
    return this.prisma.pedidoGrua.create({
      data,
    });
  }

  async getAllPedidogruas(): Promise<PedidogruaModel[]> {
    return this.prisma.pedidoGrua.findMany();
  }

  async getPedidogrua(id: number): Promise<PedidogruaModel> {
    return this.prisma.pedidoGrua.findUnique({
      where: { PedidoID: id },
    });
  }

  async updatePedidogrua(id: number, data: PedidogruaModel): Promise<PedidogruaModel> {
    return this.prisma.pedidoGrua.update({
      where: { PedidoID: id },
      data,
    });
  }

  async deletePedidogrua(id: number): Promise<PedidogruaModel> {
    return this.prisma.pedidoGrua.update({
      where: { 
        PedidoID: id 
      },
      data: {
        DeAlta: false,
      },
    });
  }
}

