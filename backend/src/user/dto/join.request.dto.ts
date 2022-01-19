import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class JoinRequestDto {
  @IsEmail()
  @ApiProperty({
    example: 'shopping@gmail.com',
    description: '이메일',
  })
  public email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'shopping',
    description: '비밀번호',
  })
  public password: string;

  @IsString()
  @ApiProperty({
    example: 'userName',
    description: '유저이름',
  })
  public userName: string;
}
