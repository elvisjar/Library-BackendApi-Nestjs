import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export class ResponseDto {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;
}

export class ErrorResponseDto extends ResponseDto {
  @ApiProperty()
  error: string;

  static badRequest(
    message: string,
    error: string = 'Bad Request',
  ): ErrorResponseDto {
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message,
      error,
    };
  }

  static unauthorized(
    message: string,
    error: string = 'Unauthorized',
  ): ErrorResponseDto {
    return {
      statusCode: HttpStatus.UNAUTHORIZED,
      message,
      error,
    };
  }

  static forbidden(
    message: string,
    error: string = 'Forbidden',
  ): ErrorResponseDto {
    return {
      statusCode: HttpStatus.FORBIDDEN,
      message,
      error,
    };
  }

  static notFound(
    message: string,
    error: string = 'Not Found',
  ): ErrorResponseDto {
    return {
      statusCode: HttpStatus.NOT_FOUND,
      message,
      error,
    };
  }

  static conflict(
    message: string,
    error: string = 'Conflict',
  ): ErrorResponseDto {
    return {
      statusCode: HttpStatus.CONFLICT,
      message,
      error,
    };
  }

  static internalServerError(
    message: string = 'Internal server error',
    error: string = 'Internal Server Error',
  ): ErrorResponseDto {
    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message,
      error,
    };
  }
}
