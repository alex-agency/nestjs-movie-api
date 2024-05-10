import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { GenreDto } from './dto/genre.dto';
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
import { Genre } from './domain/genre';
import { GenresService } from './genres.service';

@ApiBearerAuth()
@ApiTags('Genres')
@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @ApiOperation({ summary: 'Add Genre' })
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: Genre,
  })
  @ApiConflictResponse({
    description: 'Already Exist',
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  AddGenre(@Body() genreDto: GenreDto): Promise<Genre> {
    return this.genresService.create(genreDto);
  }

  @ApiOperation({ summary: 'List Genres' })
  @ApiOkResponse({
    type: Array,
    isArray: true,
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async ListGenres(): Promise<Genre[]> {
    return await this.genresService.findMany();
  }

  @ApiOperation({ summary: 'Delete Genre' })
  @Delete(':name')
  @ApiNoContentResponse({
    description: 'Deleted Successfully',
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  @ApiParam({
    name: 'name',
    type: String,
    required: true,
    description: 'This is a required property',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async DeleteGenre(@Param('name') name: Genre['name']): Promise<void> {
    return this.genresService.delete(name);
  }
}
