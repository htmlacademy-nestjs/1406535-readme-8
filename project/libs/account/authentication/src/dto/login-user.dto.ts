import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: 'User email address',
    example: 'john_doe@gmail.com'
  })
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: 'SupeRpass123'
  })
  public password: string;
}
