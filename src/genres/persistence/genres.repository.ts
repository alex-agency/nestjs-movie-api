import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository, In } from 'typeorm';
import { GenreEntity } from './genre.entity';
import { Genre } from 'src/genres/domain/genre';
import { GenreMapper } from './genre.mapper';

@Injectable()
export class GenresRepository {
  constructor(
    @InjectRepository(GenreEntity)
    private readonly genresRepository: Repository<GenreEntity>,
  ) {}

  async create(data: Partial<Genre>): Promise<Genre> {
    const persistenceModel = GenreMapper.toPersistence(data);
    const newEntity = await this.genresRepository.save(
      this.genresRepository.create(persistenceModel),
    );
    return GenreMapper.toDomain(newEntity);
  }

  async findMany(): Promise<Genre[]> {
    const where: FindOptionsWhere<GenreEntity> = {};
    const entities = await this.genresRepository.find({
      where: where,
    });

    return entities.map((genre) => GenreMapper.toDomain(genre));
  }

  async findByNames(names: string[]): Promise<Genre[]> {
    const entities = await this.genresRepository.findBy({
      name: In(names),
    });

    return entities.map((genre) => GenreMapper.toDomain(genre));
  }

  async findOne(fields: Partial<Genre>): Promise<Genre> {
    const entity = await this.genresRepository.findOne({
      where: fields as FindOptionsWhere<GenreEntity>,
    });

    return entity ? GenreMapper.toDomain(entity) : null;
  }

  async delete(name: Genre['name']): Promise<void> {
    await this.genresRepository.delete(name);
  }
}
