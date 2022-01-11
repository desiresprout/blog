import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Post, Comment } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}
  async getPosts(cursor?: number) {
    /* userID가 있으면 유저별 최신 포스트 리스트
      없으면 recent 포스트 리스트
    */

    return await this.prisma.post.findMany({
      where: {
        is_deleted: false,
        is_private: false,
      },
      cursor: cursor > 0 ? { id: Number(cursor) - 1 } : undefined,
      include: {
        user: true,
        _count: {
          select: {
            comments: true,
          },
        },
      },
      take: 20,
      orderBy: {
        created_at: 'desc',
      },
    });
  }
}
