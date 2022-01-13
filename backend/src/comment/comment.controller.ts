import { Query, Controller, Get, NotFoundException, ForbiddenException } from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';

@ApiTags('COMMENT')
@Controller('api/comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @ApiOperation({ summary: '댓글' })
  @Get()
  async getComments(@Query('postID') postID: string, @Query('cursor') cursor?: string) {
    if (postID || !cursor) {
      throw new ForbiddenException();
    }
    const comments = await this.commentService.getComments(postID, cursor);
    if (comments) {
      return comments;
    } else {
      throw new NotFoundException();
    }
  }
}
