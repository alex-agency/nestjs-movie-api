import { Movie } from '../domain/movie';
import { MovieEntity } from './movie.entity';
import { GenreEntity } from 'src/genres/persistence/genre.entity';

export class MovieMapper {
  static toDomain(entity: MovieEntity): Movie {
    const movie = new Movie();
    movie.title = entity.title;
    movie.description = entity.description;
    movie.releaseDate = entity.releaseDate;
    if (entity.genres) {
      movie.genres = entity.genres.map((genre: GenreEntity) => genre.name);
    }
    return movie;
  }

  static toPersistence(movie: Partial<Movie>): MovieEntity {
    const movieEntity = new MovieEntity();
    movieEntity.title = movie.title;
    movieEntity.description = movie.description;
    movieEntity.releaseDate = movie.releaseDate;
    if (movie.genres) {
      const genres: GenreEntity[] = movie.genres.map((name) => {
        const entity: GenreEntity = new GenreEntity();
        entity.name = name;
        return entity;
      });
      movieEntity.genres = genres;
    }
    return movieEntity;
  }
}
