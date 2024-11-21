import { Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { AuthRoles, ROLES_KEY } from './roles.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<AuthRoles[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // if public route, don't check JWT
    if (requiredRoles?.includes(AuthRoles.PUBLIC)) return true;
    // check JWT
    const isJwtValid = await super.canActivate(context);
    if (!isJwtValid) return false;
    // if no roles specified, allow access
    if (!requiredRoles) return true;
    // check user role
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.includes(user.role as AuthRoles);
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<AuthRoles[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    // if public route, don't process user
    if (requiredRoles?.includes(AuthRoles.PUBLIC)) return true;
    // process user
    return super.handleRequest(err, user, info, context);
  }
}
