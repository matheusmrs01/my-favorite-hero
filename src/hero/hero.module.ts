import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

import { HeroService } from './hero.service';
import { HeroController } from './hero.controller';
import { HeroRepository } from './entities/hero.repository';

@Module({
  imports: [HttpModule, ConfigModule.forRoot()],
  controllers: [HeroController],
  providers: [HeroService, HeroRepository],
})
export class HeroModule {}
