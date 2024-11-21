import {
  IsString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  Length,
  Matches,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';
import { UserRole } from 'src/user/entities/user.entity';

export class CreateUserDto {
  /**
   * First name of the user
   * @example "John"
   */
  @IsString()
  @IsNotEmpty()
  @Length(1, 250)
  firstName: string;

  /**
   * Last name of the user
   * @example "Doe"
   */
  @IsString()
  @IsNotEmpty()
  @Length(1, 250)
  lastName: string;

  /**
   * Email of the user
   * @example "john.doe@example.com"
   */
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsNotEmpty()
  @Length(1, 250)
  email: string;

  /**
   * Birth date of the user
   * @example "1990-01-01"
   */
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Birth date must be in format YYYY-MM-DD',
  })
  birthDate: string;

  /**
   * Password of the user
   * @example "Test123!@#"
   */
  @IsString()
  @Length(8, 250)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message:
      'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character',
  })
  password: string;

  /**
   * Phone number of the user
   * @example "+1 (555) 123-4567"
   */
  @IsOptional()
  @IsPhoneNumber('US', {
    message: 'Phone number must be a valid US phone number',
  })
  phoneNumber?: string;

  /**
   * Role of the user
   * @example ["USER", "ADMIN"]
   */
  @IsEnum(UserRole, { message: 'Invalid role' })
  role: UserRole = UserRole.USER;
}

// Example JSON input for Postman:
/*
{
  "firstName": "John",
  "lastName": "Doe", 
  "email": "john.doe@example.com",
  "birthDate": "1990-01-01",
  "password": "Test123!@#",
  "phoneNumber": "+1 (555) 123-4567",
  "role": "USER",
  "active": false
}
*/
