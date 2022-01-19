import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginRequestDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'shopping@gmail.com',
    description: '이메일',
  })
  public email: string;
}
