import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from '@prisma/client';

@Controller('vehiculos')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  async createVehiculo(@Body() data: Usuario) {
    return this.usuarioService.createUsuario(data);
  }

  @Get()
  async getVehiculos() {
    return this.usuarioService.getUsuarios();
  }

  @Get(':patente')
  async getVehiculoById(@Param(':id') Id: number) {
    return this.usuarioService.getUsuarioByNombre(Id);
  }

  @Put(':patente')
  async unableVehiculoByPatente(@Param(':id') Id: number): Promise<Usuario> {
    return this.usuarioService.unableUsuarioById(Id);
  } 
}
