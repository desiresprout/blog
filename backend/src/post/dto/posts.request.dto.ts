import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsEmpty, IsNumber } from 'class-validator';

export class PostsRequestDto {
  @IsString()
  @IsEmpty()
  @ApiProperty({
    example: 'abc12345',
    description: '유저ID',
  })
  public userID: string;

  @IsNumber()
  @IsEmpty()
  @ApiProperty({
    example: 123,
    description: 'cursor',
  })
  public cursor: number;
}
