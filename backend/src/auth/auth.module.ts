import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaModule } from '../prisma/prisma.module';
import { CacheModule } from '../cache/cache.module';
import * as cacheOptions from '../cache/cacheOptions';

@Module({
  imports: [PrismaModule, CacheModule.forRoot(cacheOptions)],
  providers: [AuthService],
  exports: [AuthService],
  controllers: [],
})
export class AuthModule {}
