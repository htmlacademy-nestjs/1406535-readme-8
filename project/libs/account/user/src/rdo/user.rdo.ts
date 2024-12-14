import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserRdo {
  @ApiProperty({
    description: 'The unique user ID',
    example: '134ce8babd-cc30-4805-9b12-d9420398e7c5',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'User email address',
    example: 'john_doe@gmail.com'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User name with/without surname',
    example: 'John Doe'
  })
  @Expose()
  public fullName: string;

  @ApiProperty({
    description: 'User avatar (optional)',
    example: '/images/user.png'
  })
  @Expose()
  public avatar?: string;
}
