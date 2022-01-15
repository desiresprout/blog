import { Controller, NotFoundException, Get, Query, Response, ForbiddenException } from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PostsRequestDto } from './dto/posts.request.dto';
import { PostService } from './post.service';
import { CommentService } from '../comment/comment.service';
import modelSerializer from '../serializers/model.serializer';
import { PostSerializer } from '../serializers/post.serializer';
import { CommentSerializer } from '../serializers/comment.serializer';
import prismaClient from '@prisma/client';

type Comment = prismaClient.Comment & { replyCount?: number };

@ApiTags('포스트')
@Controller('')
export class PostController {
  constructor(private postService: PostService, private readonly commentService: CommentService) {}

  @ApiOperation({ summary: '포스트들' })
  @Get('posts')
  async posts(@Query('cursor') cursor: string, @Query('userID') userID?: string) {
    const posts = await this.postService.getPosts(cursor, userID);

    const postSerialized = modelSerializer(posts, PostSerializer);

    if (!posts) {
      throw new NotFoundException();
    }

    return postSerialized;
  }

  @ApiOperation({ summary: '포스트' })
  @Get('post')
  async post(@Query('postID') postID: string, @Query('cursor') cursor?: string) {
    const post = await this.postService.getPost(postID, cursor);

    if (!post) {
      throw new NotFoundException();
    }

    const comments: Comment[] = await this.commentService.getComments(postID);

    const commentIDs = comments?.map((comment) => comment.id);

    const subCommentCounts = await this.commentService.getSubCommentsCount(commentIDs);

    comments.forEach((comment) => {
      const subCommentCount = subCommentCounts.find((v) => v.parentId === comment.id);
      if (subCommentCount) {
        comment.replyCount = subCommentCount._count;
        return;
      }
      comment.replyCount = 0;
    });

    const postSerialized = modelSerializer(post, PostSerializer);

    const commentsSerialized = modelSerializer(comments, CommentSerializer);

    if (!post) {
      throw new NotFoundException();
    }

    postSerialized[0].comments = commentsSerialized;

    return postSerialized;
  }
}
