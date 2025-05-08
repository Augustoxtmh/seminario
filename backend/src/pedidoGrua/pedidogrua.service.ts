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

  async updatePedidoGrua(data: PedidoGrua): Promise<PedidoGrua> {
    const updatedPedidoGrua = await this.prisma.pedidoGrua.update({
      where: { PedidoID: data.PedidoID },
      data,
    });
  
    if (data.Patente) {
      await this.prisma.pedidoGrua.updateMany({
        where: { Patente: data.Patente },
        data: { Patente: data.Patente },
      });
    }
  
    return updatedPedidoGrua;
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

  async getPedidogruaPorPatente(id: string): Promise<PedidoGrua[]> {
    return this.prisma.pedidoGrua.findMany({
      where: { Patente: id },
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

