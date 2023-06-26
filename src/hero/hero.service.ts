import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import * as md5 from 'md5';

import { HeroEntity } from './entities/hero.entity';
import { HeroRequestDto } from './dto/heroRequest.dto';
import { HeroRepository } from './entities/hero.repository';

@Injectable()
export class HeroService {
  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
    private heroRepository: HeroRepository,
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
    if (this.heroRepository.get(hero.id)) {
      throw new BadRequestException(
        `Hero with id ${hero.id} has already been marked as favorite.`,
      );
    }

    return this.heroRepository.create(hero);
  }

  async listFavoriteHeroes(): Promise<HeroEntity[]> {
    return this.heroRepository.getAll();
  }

  async deleteHero(id) {
    if (!this.heroRepository.get(id)) {
      throw new BadRequestException(`There is no hero with id ${id}.`);
    }

    this.heroRepository.delete(id);
    return { status: 200, message: 'Hero successfully unchecked.' };
  }

  private getRequestUrl(name: string): string {
    const ts = this.config.get<string>('API_MARVEL_TS');
    const privateKey = this.config.get<string>('API_MARVEL_PRIVATE_KEY');
    const publicKey = this.config.get<string>('API_MARVEL_PUBLIC_KEY');

    const hash = md5(`${ts}${privateKey}${publicKey}`);

    return `${this.config.get<string>(
      'API_MARVEL_URL',
    )}/v1/public/characters?nameStartsWith=${name}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
  }
}
