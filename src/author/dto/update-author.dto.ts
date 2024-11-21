import { PartialType } from '@nestjs/swagger';
import { AuthorDto } from './author.dto';
import { Exclude } from 'class-transformer';

export class UpdateAuthorDto extends PartialType(AuthorDto) {
  @Exclude()
  image: any;
}
