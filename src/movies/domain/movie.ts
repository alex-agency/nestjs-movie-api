import { ApiResponseProperty } from '@nestjs/swagger';

export class Movie {
  @ApiResponseProperty({
    type: String,
  })
  title: string;

  @ApiResponseProperty({
    type: String,
  })
  description: string;

  @ApiResponseProperty({
    type: Date,
  })
  releaseDate: Date;

  @ApiResponseProperty({
    type: () => Array,
  })
  genres: string[];
}
