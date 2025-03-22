import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';  // Si usas Prisma, importa el servicio de Prisma
import { Usuario } from '@prisma/client'; // Ajusta según el modelo de Prisma

@Injectable()
export class SeederService {
  constructor(private prisma: PrismaService) {}

  async seedUsuarios() {
    const usuarios: Usuario[] = [
      {
        UsuarioId: 0,
        Nombre: 'user',
        Contra: 'user',
        Autoridad: 'U',
        DeAlta: true,
      },
      {
        UsuarioId: 0,
        Nombre: 'admin',
        Contra: 'admin',
        Autoridad: 'A',
        DeAlta: true,
      },
    ];

    for (const usuario of usuarios) {
      await this.prisma.usuario.create({
        data: usuario,
      });
    }
  }

  async run() {
    await this.seedUsuarios();
  }
}
