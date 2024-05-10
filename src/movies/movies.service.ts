import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { MovieDto } from './dto/movie.dto';
import { MoviesRepository } from './persistence/movies.repository';
import { Movie } from './domain/movie';
import { IPaginationOptions } from 'src/utils/pagination/pagination-options';
import { FilterMovieDto } from './dto/filter-movie.dto';
import { GenresService } from 'src/genres/genres.service';
import { Genre } from 'src/genres/domain/genre';

@Injectable()
export class MoviesService {
  constructor(
    private readonly moviesRepository: MoviesRepository,
    private readonly genresService: GenresService,
  ) {}

  async create(createDto: MovieDto): Promise<Movie> {
    const clonedPayload = {
      ...createDto,
    };

    if (clonedPayload.title) {
      const movieObject = await this.moviesRepository.findOne({
        title: clonedPayload.title,
      });
      if (movieObject) {
        throw new ConflictException({
          status: HttpStatus.CONFLICT,
          errors: {
            title: 'Title already exists',
          },
        });
      }
    }

    if (clonedPayload.genres) {
      const genres: Genre[] = await this.genresService.findByNames(
        clonedPayload.genres,
      );
      const allNamesExist = clonedPayload.genres.every((name) =>
        genres.some((genre) => genre.name === name),
      );
      if (!allNamesExist) {
        console.warn('Not all names found.');
      }
    }

    return this.moviesRepository.create(clonedPayload);
  }

  findManyWithPagination({
    filterOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterMovieDto | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Movie[]> {
    return this.moviesRepository.findManyWithPagination({
      filterOptions,
      paginationOptions,
    });
  }

  async update(
    title: Movie['title'],
    payload: Partial<Movie>,
  ): Promise<Movie | null> {
    const clonedPayload = { ...payload };

    if (clonedPayload.title) {
      const movieObject = await this.moviesRepository.findOne({
        title: clonedPayload.title,
      });

      if (movieObject) {
        throw new ConflictException({
          status: HttpStatus.CONFLICT,
          errors: {
            title: 'Title already exists',
          },
        });
      }
    }

    return this.moviesRepository.update(title, clonedPayload);
  }

  async delete(title: Movie['title']): Promise<void> {
    await this.moviesRepository.delete(title);
  }
}
