import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { HeroService } from './hero.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HeroRequestDto } from './dto/heroRequest.dto';

@Controller('hero')
@ApiResponse({
  status: 400,
  description: 'Bad Request',
})
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @Get(':name')
  @ApiOperation({
    operationId: 'listHeroes',
    summary: 'List all heroes for a given word.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of heroes.',
  })
  async listHeroes(@Param('name') name: string) {
    return await this.heroService.listHeroes(name);
  }

  @Post()
  @ApiOperation({
    operationId: 'createHero',
    summary: 'Mark a hero as your favorite.',
  })
  @ApiResponse({
    status: 201,
    description: 'Hero marked as favorite.',
  })
  async createHero(@Body() data: HeroRequestDto) {
    return await this.heroService.createHero(data);
  }

  @Get()
  @ApiOperation({
    operationId: 'listFavoriteHeroes',
    summary: 'List of favorite heroes',
  })
  @ApiResponse({
    status: 200,
    description: 'List of favorite heroes.',
  })
  async listFavoriteHeroes() {
    return await this.heroService.listFavoriteHeroes();
  }
