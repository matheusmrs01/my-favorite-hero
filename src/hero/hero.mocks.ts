import { HeroRequestDto } from './dto/heroRequest.dto';
import { HeroEntity } from './entities/hero.entity';

const heroRequest = {
  id: '1',
  name: 'cap testing',
  description: 'des testing',
} as HeroRequestDto;

const heroMocked = {
  id: '1',
  name: 'cap testing',
  description: 'des testing',
} as HeroEntity;

export { heroRequest, heroMocked };
