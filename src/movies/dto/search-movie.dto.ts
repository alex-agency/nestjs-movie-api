import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type, Transform, plainToInstance } from 'class-transformer';
import { PaginationQueryDto } from 'src/utils/pagination/pagination-query.dto';
import { FilterMovieDto } from './filter-movie.dto';

export class SearchMovieDto extends PaginationQueryDto {
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) =>
    value ? plainToInstance(FilterMovieDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterMovieDto)
  params?: FilterMovieDto | null;
}
