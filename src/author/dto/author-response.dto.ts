import { Type } from 'class-transformer';
import { Author } from '../entities/author.entity';
import { ResponseDto } from 'src/common/dtos/response.dto';

export class AuthorCreatedDto extends ResponseDto {
  @Type(() => Author)
  data: Author;
}

export class AuthorAllDto extends ResponseDto {
  @Type(
    () =>
      class {
        authors: Author[];
        metadata: {
          total: number;
          page: number;
          limit: number;
          totalPages: number;
        };
      },
  )
  data: {
    authors: Author[];
    metadata: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export class OneAuthorDto extends ResponseDto {
  @Type(() => Author)
  data: Author;
}

export class AuthorDeletedDto extends ResponseDto {}
