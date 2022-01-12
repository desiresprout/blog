import { Controller, NotFoundException, Get, Query, Response, ForbiddenException } from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PostsRequestDto } from './dto/posts.request.dto';
import { PostService } from './post.service';
import { PostSerializer } from '../serializers/post.serializer';
import modelSerializer from '../serializers/model.serializer';

@ApiTags('포스트')
@Controller('')
export class PostController {
  constructor(private postService: PostService) {}

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
}
