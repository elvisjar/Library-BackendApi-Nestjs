import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiBody,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
  ApiCreatedResponse,
  ApiConflictResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { LoginDto } from 'src/auth/dto/login.dto';
import { LoginResponseDto } from 'src/auth/dto/auth-response.dto';
import { ErrorResponseDto, ResponseDto } from 'src/common/dtos/response.dto';

export const LoginSwagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Login a user - This endpoint is PUBLIC',
      description: 'This endpoint use the LoginDto as body',
    }),
    ApiBody({ type: LoginDto }),
    ApiOkResponse({ type: LoginResponseDto }),
    ApiBadRequestResponse({
      type: ErrorResponseDto,
      example: ErrorResponseDto.badRequest(
        'Invalid fields',
        'Validation failed',
      ),
    }),
    ApiNotFoundResponse({
      type: ErrorResponseDto,
      example: ErrorResponseDto.notFound(
        'An user with this email does not exist',
      ),
    }),
    ApiUnauthorizedResponse({
      type: ErrorResponseDto,
      examples: {
        'invalid-password': {
          value: ErrorResponseDto.unauthorized('Invalid password'),
          summary: 'Invalid password',
        },
        'verify-email': {
          value: ErrorResponseDto.unauthorized('Please verify your email'),
          summary: 'Please verify your email',
        },
      },
    }),
  );
};

export const RegisterSwagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Register a user - This endpoint is PUBLIC',
      description: 'This endpoint use the CreateUserDto as body',
    }),
    ApiCreatedResponse({ type: ResponseDto }),
    ApiConflictResponse({
      type: ErrorResponseDto,
      example: ErrorResponseDto.conflict('User with this email already exists'),
    }),
    ApiBadRequestResponse({
      type: ErrorResponseDto,
      example: ErrorResponseDto.badRequest(
        'Invalid fields',
        'Validation failed',
      ),
    }),
  );
};

export const VerifyEmailSwagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Verify a user email - This endpoint is PUBLIC',
      description: 'This endpoint use the token as query',
    }),
    ApiOkResponse({ type: ResponseDto }),
    ApiBadRequestResponse({
      type: ErrorResponseDto,
      examples: {
        'token-expired': {
          value: ErrorResponseDto.badRequest(
            'Verification link has expired. Please request a resend verification link.',
          ),
          summary: 'Verification link has expired',
        },
        'invalid-verification-link': {
          value: ErrorResponseDto.badRequest('Invalid verification link.'),
          summary: 'Invalid verification link',
        },
        'email-already-verified': {
          value: ErrorResponseDto.badRequest('This email is already verified.'),
          summary: 'Email already verified',
        },
      },
    }),
    ApiNotFoundResponse({
      type: ErrorResponseDto,
      example: ErrorResponseDto.notFound('User not found.'),
    }),
  );
};

export const ResendVerificationLinkSwagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Resend a verification link - This endpoint is PUBLIC',
      description: 'This endpoint use the email as body',
    }),
    ApiOkResponse({ type: ResponseDto }),
    ApiNotFoundResponse({
      type: ErrorResponseDto,
      example: ErrorResponseDto.notFound('User not found.'),
    }),
    ApiBadRequestResponse({
      type: ErrorResponseDto,
      example: ErrorResponseDto.badRequest('This email is already verified.'),
    }),
  );
};
