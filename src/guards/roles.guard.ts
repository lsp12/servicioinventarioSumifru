import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './papeles.decorador';
import { Role } from './rol.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    console.log('estamos aqui');
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);
    console.log(requiredRoles);
    if (!requiredRoles) {
      return true;
    }
    console.log('estamos aqui 2');
    const user = context.switchToHttp().getRequest();
    console.log(user.user, 'user');

    const users = {
      role: 'admin'
    };
    return requiredRoles.some((role) => users.role?.includes(role));
  }
}
