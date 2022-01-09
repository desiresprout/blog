import {
  Request,
  Body,
  Controller,
  NotFoundException,
  Post,
  UseGuards,
  Get,
  Response,
  ForbiddenException,
} from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
// import { LocalAuthGuard } from '../auth/local-auth.guard';
//   import { NotLoggedInGuard } from '../auth/not-logged-in.guard';
//   import { LoggedInGuard } from '../auth/logged-in.guard';
import { PostsRequestDto } from './dto/join.request.dto';
import { PostService } from './post.service';

@ApiTags('포스트')
@Controller('')
export class PostController {
  constructor(private PostService: PostService) {}

  @ApiOperation({ summary: '포스트들' })
  @Get('posts')
  async posts(@Body() data: PostsRequestDto) {
    const posts = await this.PostService.getPosts(data.userID);

    if (!posts) {
      throw new NotFoundException();
    }

    return posts;

    // if (!user) {
    //   throw new NotFoundException();
    // }
    // const result = await this.usersService.join(
    //   data.email,
    //   data.nickname,
    //   data.password
    // );
    // if (result) {
    //   return 'ok';
    // } else {
    //   throw new ForbiddenException();
    // }
  }

  //   @ApiCookieAuth('connect.sid')
  //   @ApiOperation({ summary: '로그아웃' })
  //   // @UseGuards(LoggedInGuard)
  //   @Post('logout')
  //   async logout(@Response() res) {
  //     res.clearCookie('connect.sid', { httpOnly: true });
  //     return res.send('ok');
  //   }
}
