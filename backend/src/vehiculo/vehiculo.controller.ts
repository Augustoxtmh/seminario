import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { VehiculoService } from './vehiculo.service';
import { Vehiculo } from '@prisma/client';
import { VehiculoModule } from './vehiculo.module';

@Controller('vehiculos')
export class VehiculoController {
  constructor(private readonly vehiculoService: VehiculoService) {}

  @Post()
  async createVehiculo(@Body() data: Vehiculo) {
    return this.vehiculoService.createVehiculo(data);
  }
  
  @Get()
  async getVehiculos(@Query('SPatente') patente: string, @Query('MPatente') patente2: string) {
    let res;
    
    if (patente) 
      res = this.vehiculoService.getVehiculoByPatente(patente);
    else if (patente2) 
      res = this.vehiculoService.getVehiculosByPatente(patente2);
    else 
      res = this.vehiculoService.getVehiculos();
    
    return res;
  }
  
  @Put(':UPatente')
  async updateVehiculo(
    @Param('UPatente') UPatente: string,
    @Body() vehiculo: VehiculoModule
  ): Promise<VehiculoModule> {
    return this.vehiculoService.updateVehiculo(UPatente, vehiculo);
  }
  
  @Put('unable/:DPatente')
  async unableVehiculo(
    @Param('DPatente') DPatente: string
  ): Promise<VehiculoModule> {
    return this.vehiculoService.unableVehiculoByPatente(DPatente);
  }
}