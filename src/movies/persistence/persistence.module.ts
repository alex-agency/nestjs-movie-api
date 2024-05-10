import { Module } from '@nestjs/common';
import { MoviesRepository } from './movies.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from './movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity])],
  providers: [
    {
      provide: MoviesRepository,
      useClass: MoviesRepository,
    },
  ],
  exports: [MoviesRepository],
})
export class MoviePersistenceModule {}
