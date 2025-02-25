import { Reflector } from '@nestjs/cores';

export const Roles = Reflector.createDecorator<string[]>();
