import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { VehiculoService } from './vehiculo.service';
import { Vehiculo } from '@prisma/client';

@Controller('vehiculos')
export class VehiculoController {
  constructor(private readonly vehiculoService: VehiculoService) {}

  @Post()
  async createVehiculo(@Body() data: Vehiculo) {
    return this.vehiculoService.createVehiculo(data);
  }

  @Get()
  async getVehiculos() {
    return this.vehiculoService.getVehiculos();
  }

  @Get(':patente')
  async getVehiculoByPatente(@Param(':patente') patente: string) {
    return this.vehiculoService.getVehiculoByPatente(patente);
  }

  @Put(':patente')
  async unableVehiculoByPatente(@Param('patente') patente: string): Promise<Vehiculo> {
    return this.vehiculoService.unableVehiculoByPatente(patente);
  } 
}
