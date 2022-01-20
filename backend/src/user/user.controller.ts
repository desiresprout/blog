import { Request, Response } from 'express';
import { Body, Req, Res, Controller, Post, Get, ForbiddenException, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { SessionService } from '../cache/session.service';
import { LoginAuthGuard } from '../auth/auth.guards';
import { AuthService } from '../auth/auth.service';
import { nanoid } from 'nanoid';

@ApiTags('유저')
@Controller()
export class UserController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
    private readonly sessionService: SessionService
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
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) res: Response
  ) {
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new ForbiddenException();
    }

    const deviceID = nanoid();

    await this.sessionService.setSession(email, deviceID);
    res.cookie('sid', email, {
      signed: true,
    });
    res.cookie('deviceID', deviceID);

    return 'ok';
  }

  @UseGuards(LoginAuthGuard)
  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response, @Req() req) {
    const deviceID = req?.cookies.deviceID;
    const sID = req?.signedCookies.sid;

    if (!deviceID || !sID) {
      throw new ForbiddenException();
    }

    await this.sessionService.clearSession(sID, deviceID);
    res.clearCookie('sid');
    res.clearCookie('deviceID');

    return 'ok';
  }
}
