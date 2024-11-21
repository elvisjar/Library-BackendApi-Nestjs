import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/user/entities/user.entity';

export enum AuthRoles {
  ADMIN = UserRole.ADMIN,
  USER = UserRole.USER,
  PUBLIC = 'PUBLIC',
}

export const ROLES_KEY = 'roles';
export const Roles = (...roles: AuthRoles[]) => SetMetadata(ROLES_KEY, roles);
