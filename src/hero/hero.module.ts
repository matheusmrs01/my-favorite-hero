import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

import { HeroService } from './hero.service';
import { HeroController } from './hero.controller';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
    InMemoryDBModule.forFeature('hero'),
  ],
  controllers: [HeroController],
  providers: [HeroService],
})
export class HeroModule {}
