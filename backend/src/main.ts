import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import { NestExpressApplication } from '@nestjs/platform-express/interfaces/nest-express-application.interface';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const uploadPath = join(process.cwd(), 'uploads');

  app.useStaticAssets(uploadPath, {
    prefix: '/uploads/',
  });

  app.enableCors();

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
  }

  console.log('Sirviendo archivos estáticos desde:', uploadPath);

  await app.listen(3000);
}
bootstrap();
