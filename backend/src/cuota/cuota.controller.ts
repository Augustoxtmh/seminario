import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CuotaService } from './cuota.service';
import { Cuota as CuotaModel } from '@prisma/client';

@Controller('cuota')
export class CuotaController {
  constructor(private readonly cuotaService: CuotaService) {}

  @Post()
  async createCuota(@Body() data: CuotaModel): Promise<CuotaModel> {
    return this.cuotaService.createCuota(data);
  }

  @Get()
  async getAllCuotas(): Promise<CuotaModel[]> {
    return this.cuotaService.getAllCuotas();
  }

  @Get(':id')
  async getCuota(@Param('id') id: string): Promise<CuotaModel> {
    return this.cuotaService.getCuota(Number(id));
  }

  @Get('/poliza/:poliza')
  async getCuotaByPoliza(@Param('poliza') poliza: string): Promise<{ valido: boolean; errores: string[] }>  {
    return this.cuotaService.isPolizaVigente(poliza);
  }

  @Put(':id')
  async updateCuota(@Param('id') id: string, @Body() data: CuotaModel): Promise<CuotaModel> {
    return this.cuotaService.updateCuota(Number(id), data);
  }

  @Delete(':id')
  async deleteCuota(@Param('id') id: string): Promise<CuotaModel> {
    return this.cuotaService.deleteCuota(Number(id));
  }
}

