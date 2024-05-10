import { IPaginationOptions } from './pagination-options';
import { PaginationResponseDto } from './pagination-response.dto';

export const pagination = <T>(
  data: T[],
  options: IPaginationOptions,
): PaginationResponseDto<T> => {
  return {
    data,
    hasNextPage: data.length === options.limit,
  };
};
