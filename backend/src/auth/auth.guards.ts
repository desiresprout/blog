import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';

@Injectable()
export class LoginAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const { sid } = request.cookies;

    if (!sid) {
      return false;
    }

    return true;
  }
}
