import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1/');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ credentials: true });
  await app.listen(3000);
}
bootstrap();
