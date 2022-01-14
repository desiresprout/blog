import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async getComments(postID: string, cursor?: string) {
    return this.prisma.comment.findMany({
      where: { postId: Number(postID) },
      take: 20,
    });
  }
}
