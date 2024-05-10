import { instanceToPlain } from 'class-transformer';
import {
  AfterLoad,
  Column,
  Entity,
  Index,
  ManyToMany,
  CreateDateColumn,
  PrimaryColumn,
  JoinTable,
} from 'typeorm';
import { ApiResponseProperty } from '@nestjs/swagger';
import { GenreEntity } from 'src/genres/persistence/genre.entity';

@Entity({
  name: 'movie',
})
export class MovieEntity {
  __entity?: string;

  @ApiResponseProperty({
    type: String,
  })
  @Index()
  @PrimaryColumn({ type: String })
  title: string;

  @ApiResponseProperty({
    type: String,
  })
  @Column({ type: String })
  description: string;

  @ApiResponseProperty({
    type: Date,
  })
  @CreateDateColumn()
  releaseDate: Date;

  @ApiResponseProperty({
    type: () => GenreEntity,
  })
  @JoinTable()
  @ManyToMany(() => GenreEntity, {
    cascade: true,
  })
  genres: GenreEntity[];

  @AfterLoad()
  setEntityName() {
    this.__entity = this.constructor.name;
  }

  toJSON() {
    return instanceToPlain(this);
  }
}
