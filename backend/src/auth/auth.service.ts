import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import { Usuario } from '@prisma/client';


@Injectable()
export class AuthService {
  constructor(private usuarioService: UsuarioService) {}

  async validateUser(nombre: string, contra: string): Promise<any> {
    const usuario: Usuario = await this.usuarioService.getUsuarioByNombre(nombre);
    if (usuario && (contra == usuario.Contra) && usuario.DeAlta) {
      const { Contra, ...result } = usuario;
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }
}

