import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class AuthorDto {
  /**
   * The name of the author
   * @example 'John Doe'
   */
  @IsNotEmpty()
  @IsString()
  name: string;

  /**
   * The biography of the author
   * @example 'John Doe is a writer...'
   */
  @IsNotEmpty()
  @IsString()
  biography: string;

  /**
   * The overview of the author
   * @example 'John Doe is a writer...'
   */
  @IsNotEmpty()
  @IsString()
  overview: string;

  /**
   * The birth date of the author
   * @example '1990-01-01'
   */
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Birth date must be in format YYYY-MM-DD',
  })
  birthDate: string;

  /**
   * The image of the author
   */
  @ApiProperty({ type: 'string', format: 'binary' })
  image: any;
}
