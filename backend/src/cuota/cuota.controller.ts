import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CuotaService } from './cuota.service';
import { Cuota } from '@prisma/client';

@Controller('cuota')
export class CuotaController {
  constructor(private readonly cuotaService: CuotaService) {}

  @Post()
  async createCuota(@Body() data: Cuota): Promise<Cuota> {
    return this.cuotaService.createCuota(data);
  }

  @Get()
  async getAllCuotas(): Promise<Cuota[]> {
    return this.cuotaService.getAllCuotas();
  }

  @Get(':id')
  async getCuota(@Param('id') id: string): Promise<Cuota> {
    return this.cuotaService.getCuota(Number(id));
  }

  @Get('/poliza/:poliza')
  async getCuotaByPoliza(@Param('poliza') poliza: string): Promise<{ valido: boolean; errores: string[] }>  {
    return this.cuotaService.isPolizaVigente(poliza);
  }

  @Put()
  async updateCuota(@Body() data: Cuota): Promise<Cuota> {
    return this.cuotaService.updateCuota(data);
  }

  @Delete(':id')
  async deleteCuota(@Param('id') id: string): Promise<Cuota> {
    return this.cuotaService.deleteCuota(Number(id));
  }
}

