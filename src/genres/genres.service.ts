import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GenreDto } from './dto/genre.dto';
import { GenresRepository } from './persistence/genres.repository';
import { Genre } from './domain/genre';

@Injectable()
export class GenresService {
  constructor(private readonly genresRepository: GenresRepository) {}

  async create(createProfileDto: GenreDto): Promise<Genre> {
    const clonedPayload = {
      ...createProfileDto,
    };

    if (clonedPayload.name) {
      const genreObject = await this.genresRepository.findOne({
        name: clonedPayload.name,
      });
      if (genreObject) {
        throw new ConflictException({
          status: HttpStatus.CONFLICT,
          errors: {
            name: 'Name already exists',
          },
        });
      }
    }

    return this.genresRepository.create(clonedPayload);
  }

  findMany(): Promise<Genre[]> {
    return this.genresRepository.findMany();
  }

  findByNames(names: string[]): Promise<Genre[]> {
    return this.genresRepository.findByNames(names);
  }

  async delete(name: Genre['name']): Promise<void> {
    const genreObject = await this.genresRepository.findOne({ name: name });
    if (!genreObject) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        errors: {
          name: 'Not Found',
        },
      });
    }
    return this.genresRepository.delete(genreObject.name);
  }
}
