import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PedidoGrua as PedidogruaModel } from '@prisma/client';

@Injectable()
export class PedidogruaService {
  constructor(private prisma: PrismaService) {}

  async createPedidogrua(data: PedidogruaModel) {
    return this.prisma.pedidoGrua.create({
      data,
    });
  }

  async updatePedidogrua(data: PedidogruaModel): Promise<PedidogruaModel> {
    return this.prisma.pedidoGrua.update({
      where: { PedidoID: data.PedidoID },
      data,
    });
  }

  async getAllPedidogruas(): Promise<PedidogruaModel[]> {
    return this.prisma.pedidoGrua.findMany(
      {
        where: { DeAlta: true }
      }
    );
  }

  async getPedidogrua(id: number): Promise<PedidogruaModel> {
    return this.prisma.pedidoGrua.findUnique({
      where: { PedidoID: id },
    });
  }



  async updatePedidogruaById(idPedido: number, urlFactura: string): Promise<PedidogruaModel> {
    return this.prisma.pedidoGrua.update({
      where: { PedidoID: idPedido },
      data: {
        urlFactura: urlFactura
      }
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

