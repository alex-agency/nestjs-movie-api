import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FindOptionsWhere, Repository } from 'typeorm';
import { MovieEntity } from './movie.entity';
import { Movie } from 'src/movies/domain/movie';
import { MovieMapper } from './movie.mapper';
import { IPaginationOptions } from 'src/utils/pagination/pagination-options';
import { FilterMovieDto } from 'src/movies/dto/filter-movie.dto';

@Injectable()
export class MoviesRepository {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly moviesRepository: Repository<MovieEntity>,
  ) {}

  async create(data: Partial<Movie>): Promise<Movie> {
    const persistenceModel = MovieMapper.toPersistence(data);
    const newEntity = await this.moviesRepository.save(
      this.moviesRepository.create(persistenceModel),
    );
    return MovieMapper.toDomain(newEntity);
  }

  async findManyWithPagination({
    filterOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterMovieDto | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Movie[]> {
    const where: FindOptionsWhere<MovieEntity> = {};
    if (filterOptions?.title?.length) {
      where.title = filterOptions.title;
    }
    if (filterOptions?.genres?.length) {
      where.genres = filterOptions.genres.map((genre) => ({
        name: genre.name,
      }));
    }

    const entities = await this.moviesRepository.find({
      relations: {
        genres: true,
      },
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: where,
    });
    return entities.map((movie) => MovieMapper.toDomain(movie));
  }

  async findOne(fields: Partial<Movie>): Promise<Movie> {
    const entity = await this.moviesRepository.findOne({
      relations: {
        genres: true,
      },
      where: fields as FindOptionsWhere<MovieEntity>,
    });

    return entity ? MovieMapper.toDomain(entity) : null;
  }

  async update(title: Movie['title'], payload: Partial<Movie>): Promise<Movie> {
    const entity = await this.moviesRepository.findOne({
      relations: {
        genres: true,
      },
      where: { title: title },
    });

    if (!entity) {
      throw new Error('Movie not found');
    }

    const updatedEntity = await this.moviesRepository.save(
      this.moviesRepository.create(
        MovieMapper.toPersistence({
          ...MovieMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return MovieMapper.toDomain(updatedEntity);
  }

  async delete(title: Movie['title']): Promise<void> {
    await this.moviesRepository.delete(title);
  }
}
