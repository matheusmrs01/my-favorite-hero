import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export interface HeroEntity extends InMemoryDBEntity {
  id: string;
  name: string;
  description: string;
}
