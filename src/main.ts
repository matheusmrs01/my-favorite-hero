import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, NestApplicationOptions } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { utilities as nestWinstonUtilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';

async function bootstrap() {
  const options = createNestOptions();
  const app = await NestFactory.create(AppModule, options);

  app.setGlobalPrefix('api');
  setupSwaggerModule(app);

  await app.listen(3000);
}

function setupSwaggerModule(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('My Favorite Hero')
    .setDescription('Api criada para listar os hérois favoritos da marvel.')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
}

function createNestOptions(): NestApplicationOptions {
  const appName = 'my-favorite-hero';
  const logger = WinstonModule.createLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          nestWinstonUtilities.format.nestLike(appName),
        ),
      }),
    ],
  });

  return { logger };
}

bootstrap();
