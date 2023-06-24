import { Controller, Get, Param } from '@nestjs/common';
import { HeroService } from './hero.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ParamsDto } from './dto/params.dto';

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
    summary: 'List all heroes for a given word',
  })
  @ApiResponse({
    status: 200,
    description: 'List of heroes.',
  })
  async listHeroes(@Param() params: ParamsDto) {
    return await this.heroService.listHeroes(params.name);
  }
}
