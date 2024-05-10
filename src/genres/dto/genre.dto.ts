import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GenreDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  name: string;
}
