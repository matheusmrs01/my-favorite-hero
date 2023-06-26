import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class HeroRequestDto {
  @IsString()
  @ApiProperty({ type: 'string' })
  id: string;

  @IsString()
  @ApiProperty({ type: 'string' })
  name: string;

  @IsString()
  @ApiProperty({ type: 'string' })
  description: string;

  constructor(data: HeroRequestDto) {
    Object.assign(this, data);
  }
}
