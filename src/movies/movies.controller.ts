import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { MovieDto } from './dto/movie.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiOperation,
  ApiNotFoundResponse,
  ApiConflictResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';

import {
  PaginationResponse,
  PaginationResponseDto,
} from 'src/utils/pagination/pagination-response.dto';
import { PaginationQueryDto } from 'src/utils/pagination/pagination-query.dto';
import { Movie } from './domain/movie';
import { MoviesService } from './movies.service';
import { pagination } from 'src/utils/pagination/pagination';
import { SearchMovieDto } from './dto/search-movie.dto';

@ApiBearerAuth()
@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @ApiOperation({ summary: 'Add Movie' })
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: Movie,
  })
  @ApiConflictResponse({
    description: 'Already Exist',
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  AddMovie(@Body() createDto: MovieDto): Promise<Movie> {
    return this.moviesService.create(createDto);
  }

  @ApiOperation({ summary: 'List Movies' })
  @ApiOkResponse({
    type: PaginationResponse(Movie),
    isArray: true,
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async ListMovies(
    @Query() query: PaginationQueryDto,
  ): Promise<PaginationResponseDto<Movie>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }
    return pagination(
      await this.moviesService.findManyWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @ApiOperation({ summary: 'Search Movies' })
  @ApiOkResponse({
    type: PaginationResponse(Movie),
    isArray: true,
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  @Post('search')
  @HttpCode(HttpStatus.OK)
  async SearchMovies(
    @Query() searchQuery: SearchMovieDto,
  ): Promise<PaginationResponseDto<Movie>> {
    const page = searchQuery?.page ?? 1;
    let limit = searchQuery?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }
    return pagination(
      await this.moviesService.findManyWithPagination({
        filterOptions: searchQuery?.params,
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @ApiOperation({ summary: 'Update Movie' })
  @ApiOkResponse({
    type: Movie,
    description: 'Updated Successfully',
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  @Patch(':title')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'title',
    type: String,
    required: true,
    description: 'This is a required property',
  })
  UpdateMovie(
    @Param('title') title: Movie['title'],
    @Body() updateDto: MovieDto,
  ): Promise<Movie | null> {
    return this.moviesService.update(title, updateDto);
  }

  @ApiOperation({ summary: 'Delete Movie' })
  @Delete(':title')
  @ApiNoContentResponse({
    description: 'Deleted Successfully',
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  @ApiParam({
    name: 'title',
    type: String,
    required: true,
    description: 'This is a required property',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async DeleteMovie(@Param('title') title: Movie['title']): Promise<void> {
    return this.moviesService.delete(title);
  }
}
