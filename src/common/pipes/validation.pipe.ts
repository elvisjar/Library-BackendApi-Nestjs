import {
  ValidationPipe,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';

export const validationPipe = new ValidationPipe({
  transform: true,
  stopAtFirstError: true,
  transformOptions: {
    enableImplicitConversion: true,
  },
  errorHttpStatusCode: HttpStatus.BAD_REQUEST,
  exceptionFactory: (errors) => {
    const error = new BadRequestException(errors);
    error.getResponse = () => ({
      message:
        Array.isArray(errors) && errors.length > 0
          ? Object.values(errors[0].constraints)[0]
          : 'Validation failed',
      error: 'Fields validation failed',
      statusCode: HttpStatus.BAD_REQUEST,
    });
    return error;
  },
});
