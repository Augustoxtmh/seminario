import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from '@prisma/client';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  async createUsuario(@Body() data: Usuario) {
    return this.usuarioService.createUsuario(data);
  }

  @Get()
  async getUsuarios() {
    return this.usuarioService.getUsuarios();
  }

  @Get(':nombre')
  async getUsuarioByNombre(@Param(':nombre') usuario: string) {
    return this.usuarioService.getUsuarioByNombre(usuario);
  }

  @Put(':id')
  async unableUsuarioById(@Param(':id') Id: number): Promise<Usuario> {
    return this.usuarioService.unableUsuarioById(Id);
  } 
}
