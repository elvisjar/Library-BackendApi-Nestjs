import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Patch,
  Query,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthRoles, Roles } from './roles.decorator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { LoginResponseDto } from './dto/auth-response.dto';
import {
  LoginSwagger,
  RegisterSwagger,
  ResendVerificationLinkSwagger,
  VerifyEmailSwagger,
} from './decorators/auth-swagger.decorators';
import { ResponseDto } from 'src/common/dtos/response.dto';

@Controller('')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  // Route decorators
  @Post('login')
  @Roles(AuthRoles.PUBLIC)
  @HttpCode(HttpStatus.OK)
  // Swagger decorators
  @LoginSwagger()
  // Route handler
  async signIn(@Body() signInDto: LoginDto): Promise<LoginResponseDto> {
    const data = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'User logged in successfully',
      data,
    };
  }

  // Route decorators
  @Post('register')
  @Roles(AuthRoles.PUBLIC)
  // Swagger decorators
  @RegisterSwagger()
  // Route handler
  async register(@Body() createUserDto: CreateUserDto): Promise<ResponseDto> {
    try {
      await this.userService.create(createUserDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'User created successfully',
      };
    } catch (error) {
      throw error;
    }
  }

  // Route decorators
  @Patch('verifyEmail')
  @Roles(AuthRoles.PUBLIC)
  @HttpCode(HttpStatus.ACCEPTED)
  // Swagger decorators
  @VerifyEmailSwagger()
  // Route handler
  async verifyEmail(@Query('token') token: string): Promise<ResponseDto> {
    await this.userService.verifyEmail(token);
    return {
      statusCode: HttpStatus.ACCEPTED,
      message: 'Email verified successfully',
    };
  }

  @Post('resendVerificationLink')
  @Roles(AuthRoles.PUBLIC)
  @HttpCode(HttpStatus.OK)
  @ResendVerificationLinkSwagger()
  async resendVerificationLink(@Body('email') email: string) {
    await this.userService.resendVerificationLink(email);
    return {
      statusCode: HttpStatus.OK,
      message: 'Verification link sent successfully',
    };
  }
}
