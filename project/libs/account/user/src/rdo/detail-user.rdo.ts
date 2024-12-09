import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class DetailUserRdo {
  @ApiProperty({
    description: 'The unique user ID',
    example: '134ce8babd-cc30-4805-9b12-d9420398e7c5',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'User name with/without surname',
    example: 'John Doe'
  })
  @Expose()
  public fullName: string;

  @ApiProperty({
    description: 'User registration date',
    example: '2016-05-18T16:00:00Z'
  })
  @Expose({ name: 'CreateAt'})
  public registered: Date;

  @ApiProperty({
    description: 'User\'s published posts quantity',
    example: '5'
  })
  @Expose()
  @Transform(({ value }) => value.length)
  public posts: number;

  @ApiProperty({
    description: 'User\'s subscribers quantity',
    example: '5'
  })
  @Expose()
  @Transform(({ value }) => value.length)
  public subscribers: number;
}
