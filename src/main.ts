import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import {
  BadRequestInterceptor,
  ConflictInterceptor,
} from './common/errors/interceptors';

async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/');
  app.useGlobalInterceptors(
    new ConflictInterceptor(),
    new BadRequestInterceptor(),
  );
  await app.listen(3000);
}
bootstrap();
