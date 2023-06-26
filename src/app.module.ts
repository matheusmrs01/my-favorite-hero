import { Module } from '@nestjs/common';
import { HeroModule } from './hero/hero.module';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';

@Module({
  imports: [InMemoryDBModule.forFeature('hero'), HeroModule],
})
export class AppModule {}
