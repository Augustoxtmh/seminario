import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { PolizaService } from './poliza.service';
import { Poliza as PolizaModel } from '@prisma/client';

@Controller('polizas')
export class PolizaController {
  constructor(private readonly polizaService: PolizaService) {}

  @Post()
  async createPoliza(@Body() data: PolizaModel): Promise<PolizaModel> {
    return this.polizaService.createPoliza(data);
  }

  @Get()
  async getAllPolizas(): Promise<PolizaModel[]> {
    return this.polizaService.getAllPolizas();
  }

  @Get('buscar')
  async getPolizaPorNPoliza(@Query('NPoliza') nPoliza: string): Promise<PolizaModel> {
    return this.polizaService.getPolizaPorNPoliza(Number(nPoliza));
  }

  @Get('buscarV') 
  async getPolizasPorNPoliza(@Query('NPoliza') nPoliza: string) {
    return this.polizaService.getPolizasPorNPoliza(Number(nPoliza));
  }  

  @Get(':id')
  async getPoliza(@Param('id') id: string): Promise<PolizaModel> {
    return this.polizaService.getPoliza(id);
  }

  @Put()
  async updatePoliza(@Body() data: PolizaModel): Promise<PolizaModel> {
    return this.polizaService.updatePoliza(data);
  }

  @Delete(':id')
  async deletePoliza(@Param('id') id: string): Promise<PolizaModel> {
    return this.polizaService.deletePoliza(id);
  }
}
