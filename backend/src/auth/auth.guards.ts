import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';

@Injectable()
export class LoginAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const { sid } = request?.signedCookies;

    const { deviceID } = request?.cookies;

    if (!sid || !deviceID) {
      return false;
    }

    return true;
  }
}
