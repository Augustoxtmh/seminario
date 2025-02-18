import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
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

  @Get(':nPoliza')
  async getPoliza(@Param('id') id: string): Promise<PolizaModel> {
    return this.polizaService.getPoliza(id);
  }

  @Put(':nPoliza')
  async updatePoliza(@Param('id') id: string, @Body() data: PolizaModel): Promise<PolizaModel> {
    return this.polizaService.updatePoliza(id, data);
  }

  @Delete(':nPoliza')
  async deletePoliza(@Param('id') id: string): Promise<PolizaModel> {
    return this.polizaService.deletePoliza(id);
  }
}

