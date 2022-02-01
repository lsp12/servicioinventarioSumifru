import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './papeles.decorador';
import { Role } from './rol.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);
    console.log(requiredRoles);
    if (!requiredRoles) {
      return true;
    }
    console.log('estamos aqui 2');
    const { body } = context.switchToHttp().getRequest();
    console.log(body.user.role?.includes(requiredRoles), 'user');

    return requiredRoles.some((role) => {
      console.log(role, 'role');
      return body.user.role?.includes(role);
    });
  }
}
