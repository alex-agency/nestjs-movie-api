import { instanceToPlain } from 'class-transformer';
import { Entity, PrimaryColumn, Index, AfterLoad } from 'typeorm';
import { ApiResponseProperty } from '@nestjs/swagger';

@Entity({
  name: 'genre',
})
export class GenreEntity {
  __entity?: string;

  @ApiResponseProperty({
    type: String,
  })
  @Index()
  @PrimaryColumn({ type: String })
  name: string;

  @AfterLoad()
  setEntityName() {
    this.__entity = this.constructor.name;
  }

  toJSON() {
    return instanceToPlain(this);
  }
}
