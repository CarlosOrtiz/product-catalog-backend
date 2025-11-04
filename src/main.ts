import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { json } from 'express';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const { appPort, appEnv } = configService.get('app')

  app.use(json({ limit: '50mb' }));
  app.enableCors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
  });
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(appPort || 3000);

  Logger.log(`\n\nServer is running on localhost:${appPort} env: ${appEnv}`);
}
bootstrap();
