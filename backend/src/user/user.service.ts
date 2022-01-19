import * as bcrypt from 'bcrypt';
import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async join(email: string, password: string, userName?: string): Promise<User | null> {
    const hashedPassword = await bcrypt.hash(password, 12);

    return this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        userName: userName ? userName : Math.random().toString(10),
      },
    });
  }
}
