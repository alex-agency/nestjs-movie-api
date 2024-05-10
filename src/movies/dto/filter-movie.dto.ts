import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, ValidateNested } from 'class-validator';
import { GenreDto } from 'src/genres/dto/genre.dto';
import { Type } from 'class-transformer';

export class FilterMovieDto {
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @ValidateNested({ each: true })
  title?: string | null;

  @ApiPropertyOptional({ type: GenreDto })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GenreDto)
  genres?: GenreDto[] | null;
}
