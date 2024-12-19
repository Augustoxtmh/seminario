import { Injectable } from "@nestjs/common";
import { Usuario } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UsuarioService {
  constructor(private readonly prisma: PrismaService){}

    async createUsuario(data: Usuario) {
      return await this.prisma.usuario.create({data});
    }
  
    async getUsuarios(): Promise<Usuario[]> {
      return await this.prisma.usuario.findMany();
    }
  
    async getUsuarioByNombre(Id: number): Promise<Usuario> {
      return await this.prisma.usuario.findUnique({
        where: {
          Id
        }
      })
    }
  
    async unableUsuarioById(Id: number): Promise<Usuario> {
      return await this.prisma.usuario.update({
        where: {
          Id,
        },
        data: {
          Activo: false,
        },
      });
    } 
}

