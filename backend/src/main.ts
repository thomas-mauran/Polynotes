import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: process.env.FRONTEND_ORIGIN, credentials: true });
  const config = new DocumentBuilder()
    .setTitle('Polynotes api')
    .setDescription('Polynotes is a note taking app that allows you to create notes and organize your ideas like notion.')
    .setVersion('1.0')
    .addTag('polynotes')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document);
  await app.listen(3000);
}
bootstrap();
