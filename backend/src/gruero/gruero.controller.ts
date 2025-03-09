import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { GrueroService } from './gruero.service';
import { Gruero as GrueroModel } from '@prisma/client';

@Controller('grueros')
export class GrueroController {
  constructor(private readonly grueroService: GrueroService) {}

  @Post()
  async createGruero(@Body() data: GrueroModel): Promise<GrueroModel> {
    return this.grueroService.createGruero(data);
  }

  @Get()
  async getAllGrueros(@Query('IGruero') id: number, @Query('NGruero') nombre: string): Promise<GrueroModel[]> {
    let res;
    if (id) {
      res = this.grueroService.getGrueroById(id);
    } 
    else if (nombre) 
      {
      res = this.grueroService.getGrueroByNombre(nombre);
    } 
    else {
      res = this.grueroService.getAllGrueros();
    }

    return res
  }
  
  @Put()
  async updateGruero( @Body() data: GrueroModel): Promise<GrueroModel> {
    return this.grueroService.updateGruero(data);
  }

  @Delete(':grueroID')
  async deleteGruero(@Param('grueroID') grueroID: string): Promise<GrueroModel> {
    return this.grueroService.deleteGruero(Number(grueroID));
  }  
}

