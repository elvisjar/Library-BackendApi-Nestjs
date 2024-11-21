import {
  IsString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  Length,
  Matches,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { UserRole } from 'src/user/entities/user.entity';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 250)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 250)
  lastName: string;

  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsNotEmpty()
  @Length(1, 250)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Birth date must be in format YYYY-MM-DD',
  })
  birthDate: string;

  @IsString()
  @Length(8, 250)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message:
      'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character',
  })
  password: string;

  @IsOptional()
  @IsString()
  @Matches(
    /^(\+1|1)?[-.\s]?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/,
    {
      message: 'Phone number must be a valid US phone number',
    },
  )
  phoneNumber?: string;

  @IsEnum(UserRole, { message: 'Invalid role' })
  role: UserRole = UserRole.USER;

  @IsOptional()
  @IsBoolean()
  active: boolean = false;
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
