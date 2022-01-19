import { Body, Res, Controller, Post, Get, ForbiddenException, UseGuards, Response } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { CacheService } from '../cache/cache.service';
import { LoginAuthGuard } from '../auth/auth.guards';
import { AuthService } from '../auth/auth.service';

@ApiTags('유저')
@Controller()
export class UserController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
    private readonly cacheService: CacheService
  ) {}

  @ApiOperation({ summary: '회원가입' })
  @Post('join')
  async join(@Body() data: JoinRequestDto) {
    const dupliateUser = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (dupliateUser) {
      throw new ForbiddenException('이미 존재하는 유저입니다');
    }

    const user = await this.userService.join(data.email, data.password, data.userName);
    if (user) {
      return 'ok';
    } else {
      throw new ForbiddenException();
    }
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  @UseGuards(LoginAuthGuard)
  async login(@Body('email') email: string, @Body('password') password: string, @Response() res) {
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new ForbiddenException();
    }

    const session = await this.cacheService.setSession(email);
    res.setCookie('sid', session);

    return {};
  }

  @ApiOperation({ summary: '로그아웃' })
  @UseGuards(LoginAuthGuard)
  @Post('logout')
  async logout(@Response() res) {
    await this.cacheService.clearSession('aaa');
    res.clearCookie('sid');

    return res.send('ok');
  }
}
