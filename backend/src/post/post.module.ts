import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { CommentModule } from '../comment/comment.module';
import { CacheModule } from '../cache/cache.module';
import * as cacheOptions from '../cache/cacheOptions';

@Module({
  imports: [PrismaModule, CommentModule, CacheModule.forRoot(cacheOptions)],
  providers: [PostService],
  exports: [PostService],
  controllers: [PostController],
})
export class PostModule {}
