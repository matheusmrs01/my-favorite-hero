import { Test, TestingModule } from '@nestjs/testing';
import { HeroService } from './hero.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { heroMocked, heroRequest } from './hero.mocks';
import { HeroRepository } from './entities/hero.repository';
import { BadRequestException } from '@nestjs/common';

jest.mock('rxjs', () => {
  const original = jest.requireActual('rxjs');

  return {
    ...original,
    firstValueFrom: () =>
      new Promise((resolve) => {
        resolve({
          data: 'this is list of heroes mocked',
        });
      }),
  };
});

describe('HeroService', () => {
  let service: HeroService;
  const mockedHeroRepository = {
    get: jest.fn(),
    create: jest.fn(),
    getAll: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), HttpModule],
      providers: [
        HeroService,
        {
          provide: HeroRepository,
          useValue: mockedHeroRepository,
        },
      ],
    }).compile();

    service = module.get<HeroService>(HeroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Show hero list coming from marvel api', async () => {
    const response = service.listHeroes('testingHeroName');
    expect(response).resolves.toStrictEqual('this is list of heroes mocked');
  });

  it('Show hero marked as favorite', async () => {
    mockedHeroRepository.create.mockReturnValueOnce(heroMocked);
    const response = await service.createHero(heroRequest);

    expect(response).toStrictEqual(heroMocked);
  });

  it('Show error when trying to create an existing hero', async () => {
    mockedHeroRepository.get.mockReturnValueOnce(heroMocked);

    try {
      await service.createHero(heroRequest);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
    }
  });

  it('Show list of favorite heroes', async () => {
    const heroesList = [heroMocked, heroMocked, heroMocked];
    mockedHeroRepository.getAll.mockReturnValueOnce(heroesList);

    const response = await service.listFavoriteHeroes();
    expect(response).toStrictEqual(heroesList);
  });

  it('Show favorite heroes list when you dont have any heroes', async () => {
    const heroesList = [];
    mockedHeroRepository.getAll.mockReturnValueOnce(heroesList);

    const response = await service.listFavoriteHeroes();
    expect(response).toStrictEqual([]);
  });

  it('Show success when deleting a favorite hero', async () => {
    mockedHeroRepository.get.mockReturnValueOnce(true);
    mockedHeroRepository.delete.mockReturnValueOnce(true);
    const response = await service.deleteHero('idMocked');

    expect(response).toStrictEqual({
      status: 200,
      message: 'Hero successfully unchecked.',
    });
  });

  it('Show error when trying to delete a hero that doesnt exist', async () => {
    try {
      await service.deleteHero('idMocked');
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
    }
  });
});
