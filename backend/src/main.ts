import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  
  app.enableCors();

  const uploadPath = './uploads';
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
  }
  
  await app.listen(3000);
}
bootstrap();
