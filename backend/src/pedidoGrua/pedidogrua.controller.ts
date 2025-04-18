import { Controller, Get, Post, Body, Param, Put, Delete, BadRequestException, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PedidogruaService } from './pedidogrua.service';
import { PedidoGrua } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('pedidosgrua')
export class PedidogruaController {
  constructor(private readonly pedidogruaService: PedidogruaService) {}

  @Post()
  async createPedidogrua(@Body() data: PedidoGrua) {
    return this.pedidogruaService.createPedidogrua(data);
  }

  @Put()
  async updatePedidogrua(@Body() data: PedidoGrua): Promise<PedidoGrua> {
    return this.pedidogruaService.updatePedidoGrua(data);
  }

  @Put('montoUpd/:idPedido')
  async updateMontoPedidogrua(
    @Param('idPedido') idPedido: string,
    @Body('monto') monto: number
  ): Promise<PedidoGrua> {
    return this.pedidogruaService.updateMontoPedidogrua(Number(idPedido), monto);
  }

  @Get()
  async getAllPedidogruas(): Promise<PedidoGrua[]> {
    return this.pedidogruaService.getAllPedidogruas();
  }

  @Get(':id')
  async getPedidogrua(@Param('id') id: string): Promise<PedidoGrua> {
    return this.pedidogruaService.getPedidogrua(Number(id));
  }

  @Get(':patente')
  async getPedidogruaPorPatente(@Param('patente') id: string): Promise<PedidoGrua[]> {
    return this.pedidogruaService.getPedidogruaPorPatente(id);
  }

  @Delete(':id')
  async deletePedidogrua(@Param('id') id: string): Promise<PedidoGrua> {
    return this.pedidogruaService.deletePedidogrua(Number(id));
  }

  
  @Post('upload/:idPedido')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = extname(file.originalname);
        callback(null, `pgrua-${req.params.idPedido}-${uniqueSuffix}${extension}`);
      }
    }),
    fileFilter: (req, file, callback) => {
      if (!file.mimetype.includes('pdf')) {
        return callback(new BadRequestException('Solo se permiten archivos PDF'), false);
      }
      callback(null, true);
    }
  }))

  async uploadFile(@UploadedFile() file: Express.Multer.File, @Param('idPedido') idPedido: string) {

    if (!file) {
      throw new BadRequestException('No se recibió ningún archivo');
    }

    await this.pedidogruaService.updatePedidogruaById(Number(idPedido), `/uploads/${file.filename}`);
    return { message: 'Archivo subido correctamente', filePath: `/uploads/${file.filename}` };
  }
}

