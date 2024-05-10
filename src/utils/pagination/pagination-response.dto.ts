import { Type } from '@nestjs/common';
import { ApiResponseProperty } from '@nestjs/swagger';

export class PaginationResponseDto<T> {
  data: T[];
  hasNextPage: boolean;
}

export function PaginationResponse<T>(classReference: Type<T>) {
  abstract class Pagination {
    @ApiResponseProperty({ type: [classReference] })
    data!: T[];

    @ApiResponseProperty({
      type: Boolean,
      example: true,
    })
    hasNextPage: boolean;
  }

  Object.defineProperty(Pagination, 'name', {
    writable: false,
    value: `Pagination${classReference.name}ResponseDto`,
  });

  return Pagination;
}
