import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNotEmptyObject } from 'class-validator';

export class MovieDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: Date })
  @IsNotEmptyObject()
  @Type(() => Date)
  releaseDate: Date;

  @ApiProperty({ type: () => Array })
  @IsNotEmptyObject()
  @Type(() => String)
  genres: string[];
}
