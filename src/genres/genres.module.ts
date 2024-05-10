import { Module } from '@nestjs/common';
import { GenresController } from './genres.controller';
import { GenresService } from './genres.service';
import { GenresPersistenceModule } from './persistence/persistence.module';

@Module({
  imports: [GenresPersistenceModule],
  controllers: [GenresController],
  providers: [GenresService],
  exports: [GenresService, GenresPersistenceModule],
})
export class GenresModule {}
