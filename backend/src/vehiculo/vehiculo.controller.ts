import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
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
  async getVehiculos(@Query('SPatente') patente: string, @Query('MPatente') patente2: string) {
    if (patente) {
      return this.vehiculoService.getVehiculosByPatente(patente);
    } else if (patente2) {
      return this.vehiculoService.getVehiculosByPatente(patente2);
    }
    return this.vehiculoService.getVehiculos();
  }
  @Put(':DPatente')
  async unableVehiculoByPatente(@Param('patente') patente: string): Promise<Vehiculo> {
    return this.vehiculoService.unableVehiculoByPatente(patente);
  } 
}
