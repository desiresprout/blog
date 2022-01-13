import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Post, Comment } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}
  async getPosts(cursor: string, userID?: string) {
    return await this.prisma.post.findMany({
      where: {
        is_deleted: false,
        is_private: false,
        userId: userID > '0' ? Number(userID) : undefined,
      },
      cursor: cursor > '0' ? { id: Number(cursor) - 1 } : undefined,
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

  async getPost(postID: string, cursor?: string) {
    return await this.prisma.post.findMany({
      where: {
        is_deleted: false,
        is_private: false,
        id: Number(postID),
      },
      cursor: cursor > '0' ? { id: Number(cursor) - 1 } : undefined,
      include: {
        user: true,
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }
}
