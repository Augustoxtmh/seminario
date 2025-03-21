import { Injectable } from "@nestjs/common";
import { Usuario } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UsuarioService {
  constructor(private readonly prisma: PrismaService){}

    async createUsuario(data: Usuario) {
      const existingUser = await this.getUsuarioByNombre(data.Nombre);
      if (!existingUser) {
        return await this.prisma.usuario.create({ data });
      }
      return 'error';
    }
  
    async updateUsuario(data: Usuario): Promise<Usuario> {
      return this.prisma.usuario.update({
        where: { UsuarioId: data.UsuarioId },
        data,
      });
    }
  
    async getUsuarios(): Promise<Usuario[]> {
      return await this.prisma.usuario.findMany();
    }
  
    async getUsuarioByNombre(Nombre: string): Promise<Usuario> {
      return await this.prisma.usuario.findFirst({
        where: {
          Nombre
        }
      })
    }
  
    async unableUsuarioById(UsuarioId: number): Promise<Usuario> {
      return await this.prisma.usuario.update({
        where: {
          UsuarioId: UsuarioId
        },
        data: {
          DeAlta: false,
        },
      });
    } 
}

