import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { GrueroService } from './gruero.service';
import { gruero as GrueroModel } from '@prisma/client';

@Controller('grueros')
export class GrueroController {
  constructor(private readonly grueroService: GrueroService) {}

  @Post()
  async createGruero(@Body() data: GrueroModel): Promise<GrueroModel> {
    return this.grueroService.createGruero(data);
  }

  @Get()
  async getAllGrueros(): Promise<GrueroModel[]> {
    return this.grueroService.getAllGrueros();
  }

  @Get(':id')
  async getGruero(@Param('id') id: string): Promise<GrueroModel> {
    return this.grueroService.getGruero(Number(id));
  }

  @Put(':id')
  async updateGruero(@Param('id') id: string, @Body() data: GrueroModel): Promise<GrueroModel> {
    return this.grueroService.updateGruero(Number(id), data);
  }

  @Delete(':id')
  async deleteGruero(@Param('id') id: string): Promise<GrueroModel> {
    return this.grueroService.deleteGruero(Number(id));
  }
}

