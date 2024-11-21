import { ApiBody, ApiConsumes } from '@nestjs/swagger';

export const ApiFile = (
  fieldName: string = 'file',
  required: boolean = true,
  type: any = null,
) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiConsumes('multipart/form-data')(target, propertyKey, descriptor);
    ApiBody({
      schema: {
        type: 'object',
        required: required ? [fieldName] : [],
        properties: {
          [fieldName]: {
            type: 'string',
            format: 'binary',
            description: 'File to upload',
          },
          ...(type ? { ...new type() } : {}),
        },
      },
    })(target, propertyKey, descriptor);
  };
};

export const ApiFiles = (
  fieldName: string = 'files',
  required: boolean = true,
  type: any = null,
) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiConsumes('multipart/form-data')(target, propertyKey, descriptor);
    ApiBody({
      schema: {
        type: 'object',
        required: required ? [fieldName] : [],
        properties: {
          [fieldName]: {
            type: 'array',
            items: {
              type: 'string',
              format: 'binary',
            },
            description: 'Files to upload',
          },
          ...(type ? { ...new type() } : {}),
        },
      },
    })(target, propertyKey, descriptor);
  };
};
