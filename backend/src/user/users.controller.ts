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
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';

@ApiTags('USERS')
@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  //   @ApiOperation({ summary: '로그인' })
  // //   @UseGuards(LocalAuthGuard)
  //   @Post('login')
  //   async login(@User() user: Users) {
  //     return user;
  //   }

  @ApiOperation({ summary: '회원가입' })
  // @UseGuards(NotLoggedInGuard)
  @Post()
  async join(@Body() data: JoinRequestDto) {
    console.log('join');
    try {
      const user = await this.usersService.join(data.email, data.password);
    } catch (e) {
      console.log(e);
    }
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
