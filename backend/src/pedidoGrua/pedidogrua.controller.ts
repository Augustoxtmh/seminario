import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PedidogruaService } from './pedidogrua.service';
import { PedidoGrua as PedidogruaModel } from '@prisma/client';

@Controller('pedidosgrua')
export class PedidogruaController {
  constructor(private readonly pedidogruaService: PedidogruaService) {}

  @Post()
  async createPedidogrua(@Body() data: PedidogruaModel): Promise<PedidogruaModel> {
    return this.pedidogruaService.createPedidogrua(data);
  }

  @Get()
  async getAllPedidogruas(): Promise<PedidogruaModel[]> {
    return this.pedidogruaService.getAllPedidogruas();
  }

  @Get(':id')
  async getPedidogrua(@Param('id') id: string): Promise<PedidogruaModel> {
    return this.pedidogruaService.getPedidogrua(Number(id));
  }

  @Put(':id')
  async updatePedidogrua(@Param('id') id: string, @Body() data: PedidogruaModel): Promise<PedidogruaModel> {
    return this.pedidogruaService.updatePedidogrua(Number(id), data);
  }

  @Delete(':id')
  async deletePedidogrua(@Param('id') id: string): Promise<PedidogruaModel> {
    return this.pedidogruaService.deletePedidogrua(Number(id));
  }
}

