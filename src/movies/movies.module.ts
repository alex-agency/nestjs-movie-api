import { Module } from '@nestjs/common';

import { MoviesController } from './movies.controller';

import { MoviesService } from './movies.service';
import { MoviePersistenceModule } from './persistence/persistence.module';
import { GenresModule } from 'src/genres/genres.module';

@Module({
  imports: [MoviePersistenceModule, GenresModule],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [MoviesService, MoviePersistenceModule],
})
export class MoviesModule {}
