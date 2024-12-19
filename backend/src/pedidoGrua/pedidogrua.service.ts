import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { pedidogrua as PedidogruaModel } from '@prisma/client';

@Injectable()
export class PedidogruaService {
  constructor(private prisma: PrismaService) {}

  async createPedidogrua(data: PedidogruaModel): Promise<PedidogruaModel> {
    return this.prisma.pedidogrua.create({
      data,
    });
  }

  async getAllPedidogruas(): Promise<PedidogruaModel[]> {
    return this.prisma.pedidogrua.findMany();
  }

  async getPedidogrua(id: number): Promise<PedidogruaModel> {
    return this.prisma.pedidogrua.findUnique({
      where: { PedidoID: id },
    });
  }

  async updatePedidogrua(id: number, data: PedidogruaModel): Promise<PedidogruaModel> {
    return this.prisma.pedidogrua.update({
      where: { PedidoID: id },
      data,
    });
  }

  async deletePedidogrua(id: number): Promise<PedidogruaModel> {
    return this.prisma.pedidogrua.delete({
      where: { PedidoID: id },
    });
  }
}

