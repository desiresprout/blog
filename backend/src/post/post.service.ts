import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Post, Comment } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}
  async getPosts(userID?: string, cursor?: number) {
    /* userID가 있으면 유저별 최신 포스트 리스트
      없으면 recent 포스트 리스트
    */

    const posts = await this.prisma.post.findMany({
      where: {
        is_deleted: false,
        is_private: false,
      },
      include: {
        user: {
          // select: {
          //   email: true,
          //   password: false,
          // },
        },
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

    // console.log('posts', posts);

    // return posts;

    return posts?.map((post) => {
      return {
        ...post,
        // commentsCount: post._count.comments,
      };
    });

    // return postsInCount;

    // return this.prisma.post.findMany({
    //   where
    // });

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
