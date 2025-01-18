import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString, IsUUID, Length } from 'class-validator';
import { Comment } from '@project/shared-types';

export class CreateCommentDto implements Comment {
  @ApiProperty({
    description: '10-300 chars comment text',
    example: 'May be you are right about it. But I\'am think that you\'re terrible wrong!'
  })
  @IsString()
  @Length(10, 300)
  public text: string;

  @ApiProperty({
    description: 'Post ID',
    example: '4e8a6ef4-2e28-46f6-ae5b-1d69b5dc1752'
  })
  @IsUUID()
  public postId: string;

  @ApiProperty({
    description: 'Author ID',
    example: '676428b948541ea480d114fb'
  })
  @IsMongoId()
  public authorId: string;
}
