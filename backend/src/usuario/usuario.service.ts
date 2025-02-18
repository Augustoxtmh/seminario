import { Injectable } from "@nestjs/common";
import { Usuario } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UsuarioService {
  constructor(private readonly prisma: PrismaService){}

    async createUsuario(data: Usuario) {
      let status = 'error';
      if(!this.getUsuarioByNombre(data.Nombre))
      {
        status = 'success';
        await this.prisma.usuario.create({data})
      }
      return status;
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
  
    async unableUsuarioById(Id: number): Promise<Usuario> {
      return await this.prisma.usuario.update({
        where: {
          Id,
        },
        data: {
          DeAlta: false,
        },
      });
    } 
}

