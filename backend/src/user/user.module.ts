import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { CacheModule } from '../cache/cache.module';
import * as cacheOptions from '../cache/cacheOptions';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, CacheModule.forRoot(cacheOptions), AuthModule],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UserController],
})
export class UserModule {}
