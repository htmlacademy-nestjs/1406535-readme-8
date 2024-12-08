import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User email address',
    example: 'john_doe@gmail.com'
  })
  public email: string;

  @ApiProperty({
    description: 'User name with/without surname',
    example: 'John Doe'
  })
  public fullName: string;

  @ApiProperty({
    description: 'User password',
    example: 'SupeRpass123'
  })
  public password: string;

  @ApiProperty({
    description: 'User avatar (optional)',
    example: '/images/user.png'
  })
  public avatar: string;
}
