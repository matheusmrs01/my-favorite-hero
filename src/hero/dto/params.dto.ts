import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ParamsDto {
  @IsString()
  @ApiProperty({ type: 'string' })
  name: string;

  constructor(data: ParamsDto) {
    Object.assign(this, data);
  }
}
