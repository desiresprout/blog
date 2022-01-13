import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Comment } from '@prisma/client';

//   import bcrypt from 'bcrypt';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async getComments(postID: string, cursor?: string) {
    return this.prisma.comment.findMany({
      where: { postId: Number(postID) },
      take: 20,
    });

    // const queryRunner = this.connection.createQueryRunner();
    // await queryRunner.connect();
    // await queryRunner.startTransaction();
    // const user = await queryRunner.manager
    //   .getRepository(Users)
    //   .findOne({ where: { email } });
    // if (user) {
    //   throw new ForbiddenException('이미 존재하는 사용자입니다');
    // }
    // const hashedPassword = await bcrypt.hash(password, 12);
    // try {
    //   return user || null;
    // } catch (error) {
    //   console.error(error);
    //   throw error;
    // } finally {
    // }
  }
}
