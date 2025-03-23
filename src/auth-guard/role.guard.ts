import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TYPE } from './types';


@Injectable()
export class RoleAuthGuard implements CanActivate {

    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.getAllAndOverride(TYPE,[
            context.getHandler(),
            context.getClass()
        ])
        if(!roles){
            return true
        }
       const {user} = context.switchToHttp().getRequest();
       return roles.some((role)=> role == user.type)
    }

}
