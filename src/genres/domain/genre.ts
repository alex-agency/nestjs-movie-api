import { ApiResponseProperty } from '@nestjs/swagger';

export class Genre {
  @ApiResponseProperty({
    type: String,
  })
  name: string;
}
