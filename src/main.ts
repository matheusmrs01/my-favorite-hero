import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestApplicationOptions } from '@nestjs/common';
import { utilities as nestWinstonUtilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';

async function bootstrap() {
  const options = createNestOptions();
  const app = await NestFactory.create(AppModule, options);
  app.setGlobalPrefix('api');
  await app.listen(3000);
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
