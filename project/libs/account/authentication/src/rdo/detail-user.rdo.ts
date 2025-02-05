import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class DetailUserRdo {
  @ApiProperty({
    description: 'The unique user ID',
    example: '676428b948541ea480d114fb',
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
  @Expose()
  public createdAt: Date;

  @ApiProperty({
    description: 'User\'s published posts quantity',
    example: '5'
  })
  @Expose()
  @Transform(({ value }) => value?.length || 0)
  public posts: number;

  @ApiProperty({
    description: 'User\'s subscribers quantity',
    example: '5'
  })
  @Expose()
  @Transform(({ value }) => value?.length || 0)
  public subscribers: number;
}
