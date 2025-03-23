import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PedidoGrua } from '@prisma/client';

@Injectable()
export class PedidogruaService {
  constructor(private prisma: PrismaService) {}

  async createPedidogrua(data: PedidoGrua) {
    return this.prisma.pedidoGrua.create({
      data,
    });
  }

  async updatePedidogrua(data: PedidoGrua): Promise<PedidoGrua> {
    return this.prisma.pedidoGrua.update({
      where: { PedidoID: data.PedidoID },
      data,
    });
  }

  async getAllPedidogruas(): Promise<PedidoGrua[]> {
    return this.prisma.pedidoGrua.findMany(
      {
        where: { DeAlta: true }
      }
    );
  }

  async getPedidogrua(id: number): Promise<PedidoGrua> {
    return this.prisma.pedidoGrua.findUnique({
      where: { PedidoID: id },
    });
  }

  async updatePedidogruaById(idPedido: number, urlFactura: string): Promise<PedidoGrua> {
    return this.prisma.pedidoGrua.update({
      where: { PedidoID: idPedido },
      data: {
        urlFactura: urlFactura
      }
    });
  }

  async updateMontoPedidogrua(idPedido: number, monto: number): Promise<PedidoGrua> {
    return this.prisma.pedidoGrua.update({
      where: { PedidoID: idPedido },
      data: { Monto: monto },
    });
  }
  

  async deletePedidogrua(id: number): Promise<PedidoGrua> {
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

