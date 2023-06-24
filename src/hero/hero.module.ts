import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

import { HeroService } from './hero.service';
import { HeroController } from './hero.controller';

@Module({
  imports: [HttpModule, ConfigModule.forRoot()],
  controllers: [HeroController],
  providers: [HeroService],
})
export class HeroModule {}
