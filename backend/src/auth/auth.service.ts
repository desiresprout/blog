import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly cache: CacheService) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
        password,
      },
    });

    if (!user) {
      return null;
    }

    const result = await bcrypt.compare(email, user.password);

    if (!result) {
      return null;
    }

    return true;
  }
}
