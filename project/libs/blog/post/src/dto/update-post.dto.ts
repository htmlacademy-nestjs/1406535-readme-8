import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';
import { IsUUID } from 'class-validator';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @ApiProperty({
    description: 'Post ID',
    example: '4e8a6ef4-2e28-46f6-ae5b-1d69b5dc1752'
  })
  @IsUUID()
  public id: string;
}
