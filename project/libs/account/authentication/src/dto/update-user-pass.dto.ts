import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString, Length } from 'class-validator';

export class UpdateUserPassRdo {
  @ApiProperty({
    description: 'The unique user ID',
    example: '676428b948541ea480d114fb'
  })
  @IsMongoId()
  public userId?: string;

  @ApiProperty({
    description: 'Old user password',
    example: 'SupeRpass123'
  })
  @IsString()
  @Length(6, 12)
  public oldPassword: string;

  @ApiProperty({
    description: 'New user password',
    example: 'SupeRpass123'
  })
  @IsString()
  @Length(6, 12)
  public newPassword: string;

}
