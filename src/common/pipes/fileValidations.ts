import { BadRequestException, ParseFilePipeBuilder } from '@nestjs/common';

const exceptionFactoryImageValidator = (error: string) => {
  if (error.includes('image')) {
    error = 'Invalid file type, must be: jpg, png, jpeg';
  }
  if (error === 'File is required') error = 'Please upload an image file';
  throw new BadRequestException(error);
};

export const ImageValidatorBuild = new ParseFilePipeBuilder()
  .addFileTypeValidator({
    fileType: /^image\/(png|jpg|jpeg)$/,
  })
  .addMaxSizeValidator({
    maxSize: 1024 * 1024,
    message: 'File size must be under 1MB',
  })
  .build({
    fileIsRequired: true,
    exceptionFactory: exceptionFactoryImageValidator,
  });

export const ImageValidatorOptional = new ParseFilePipeBuilder()
  .addFileTypeValidator({
    fileType: /^image\/(png|jpg|jpeg)$/,
  })
  .addMaxSizeValidator({
    maxSize: 1024 * 1024,
    message: 'File size must be under 1MB',
  })
  .build({
    fileIsRequired: false,
    exceptionFactory: exceptionFactoryImageValidator,
  });
