import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { HeroEntity } from './hero.entity';

export class HeroRepository extends InMemoryDBService<HeroEntity> {}
