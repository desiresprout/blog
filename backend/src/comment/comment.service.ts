import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async getComments(postID: string, cursor?: string) {
    return this.prisma.comment.findMany({
      where: {
        postId: Number(postID),
      },
      take: 20,
      orderBy: {
        created_at: 'asc',
      },
    });
  }

  async getSubComments(parentID: string) {
    return this.prisma.comment.findMany({
      where: {
        postId: Number(parentID),
        depth: 1,
      },
      take: 20,
      orderBy: {
        created_at: 'asc',
      },
    });
  }

  async getSubCommentsCount(parentIDs: number[]) {
    return this.prisma.comment.groupBy({
      by: ['parentId'],
      where: {
        depth: 1,
        parentId: { in: parentIDs },
      },
      _count: true,
    });
  }
}
