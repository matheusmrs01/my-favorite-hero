import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import * as md5 from 'md5';
import {
  InMemoryDBService,
  InjectInMemoryDBService,
} from '@nestjs-addons/in-memory-db';

import { HeroEntity } from './entities/hero.entity';
import { HeroRequestDto } from './dto/heroRequest.dto';

@Injectable()
export class HeroService {
  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
    @InjectInMemoryDBService('hero')
    private heroEntityService: InMemoryDBService<HeroEntity>,
  ) {}

  async listHeroes(name: string): Promise<Record<string, any>> {
    const url = this.getRequestUrl(name);
    let response;

    try {
      response = await firstValueFrom(this.httpService.get(url));
    } catch (error) {
      throw new BadRequestException(error.response.request);
    }

    return response.data;
  }

  async createHero(hero: HeroRequestDto): Promise<HeroEntity> {
    if (this.heroEntityService.get(hero.id)) {
      throw new BadRequestException(
        `Hero with id ${hero.id} has already been marked as favorite.`,
      );
    }

    return this.heroEntityService.create(hero);
  }

  async listFavoriteHeroes(): Promise<HeroEntity[]> {
    return this.heroEntityService.getAll();
  }

  private getRequestUrl(name: string): string {
    const ts = this.config.get<string>('API_MARVEL_TS');
    const privateKey = this.config.get<string>('API_MARVEL_API_PRIVATE_KEY');
    const publicKey = this.config.get<string>('API_MARVEL_API_PUBLIC_KEY');

    const hash = md5(`${ts}${privateKey}${publicKey}`);

    return `${this.config.get<string>(
      'API_MARVEL_URL',
    )}/v1/public/characters?nameStartsWith=${name}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
  }
}
