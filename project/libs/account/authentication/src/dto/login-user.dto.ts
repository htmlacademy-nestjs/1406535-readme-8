import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'User email address',
    example: 'john_doe@gmail.com',
  })
  @IsEmail()
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: 'SupeRpass123'
  })
  @IsString()
  public password: string;
}
