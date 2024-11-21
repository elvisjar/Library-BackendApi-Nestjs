import { AuthorDto } from './author.dto';
import { Exclude } from 'class-transformer';

export class CreateAuthorDto extends AuthorDto {
  @Exclude()
  image: any;
}
