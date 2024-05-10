import { Genre } from 'src/genres/domain/genre';
import { GenreEntity } from './genre.entity';

export class GenreMapper {
  static toDomain(entity: GenreEntity): Genre {
    const genre = new Genre();
    genre.name = entity.name;
    return genre;
  }

  static toPersistence(genre: Partial<Genre>): GenreEntity {
    const genreEntity = new GenreEntity();
    genreEntity.name = genre.name;
    return genreEntity;
  }
}
