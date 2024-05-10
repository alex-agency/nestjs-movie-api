import { Module } from '@nestjs/common';
import { GenresRepository } from './genres.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenreEntity } from './genre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GenreEntity])],
  providers: [
    {
      provide: GenresRepository,
      useClass: GenresRepository,
    },
  ],
  exports: [GenresRepository],
})
export class GenresPersistenceModule {}
