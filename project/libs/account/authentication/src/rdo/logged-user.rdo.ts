import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LoggedUserRdo {
  @ApiProperty({
    description: 'The unique user ID',
    example: '676428b948541ea480d114fb',
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
    description: 'User JWT token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
  })
  @Expose()
  public token: string;
}
