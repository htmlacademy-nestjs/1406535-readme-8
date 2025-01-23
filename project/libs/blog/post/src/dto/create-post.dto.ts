import { ApiProperty } from '@nestjs/swagger';
import { PostTypes } from '@project/shared-types';
import { Transform } from 'class-transformer';
import { ArrayMaxSize, IsArray, IsBoolean, IsIn, IsMongoId, IsOptional, IsString, IsUrl, Length, Matches, MaxLength, NotContains, Validate, ValidateIf, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

const YOUTUBE_REGEXP = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/gi;
const SPACE_SIGN = ' ';
const ANY_LETTERS = /^\p{L}+$/u;

@ValidatorConstraint({ name: 'letterStartValidator' })
export class LetterStartValidator implements ValidatorConstraintInterface {
  validate(values: string[] = []): boolean {
    if (values.length) {
      return values.every((value) => ANY_LETTERS.test(value));
    }
    return false;
  }
}

export class CreatePostDto {
  @ApiProperty({
    description: 'One of post type: video, text, link, quota, photo',
    example: 'VIDEO'
  })
  @IsIn(Object.values(PostTypes))
  public type: (typeof PostTypes)[keyof typeof PostTypes];

  @ApiProperty({
    description: 'The unique user ID',
    example: '676428b948541ea480d114fb',
  })
  @IsMongoId()
  @IsOptional()
  public userId?: string;

  @IsArray()
  @IsString({ each: true })
  @Length(3, 10, { each: true })
  @NotContains(SPACE_SIGN, { each: true })
  @Transform(({ value }) => value.map(item => item.toLowerCase()))
  @Transform(({ value }) => Array.from(new Set(value)))
  @ArrayMaxSize(8)
  @Validate(LetterStartValidator, { message: 'Tags must begins with letter' })
  @IsOptional()
  public tags: string[];

  @ValidateIf(obj => obj.type === PostTypes.Link)
  @IsUrl()
  public linkUrl: string;

  @ValidateIf(obj => obj.type === PostTypes.Link)
  @IsString()
  @MaxLength(300)
  @IsOptional()
  public linkDescription: string;

  @ValidateIf(obj => obj.type === PostTypes.Quota)
  @IsString()
  @Length(20, 300)
  public quotaText: string;

  @ValidateIf(obj => obj.type === PostTypes.Quota)
  @IsString()
  @Length(3, 50)
  public quotaAuthor: string;

  @ValidateIf(obj => obj.type === PostTypes.Text)
  @IsString()
  @Length(20, 50)
  public textTitle: string;

  @ValidateIf(obj => obj.type === PostTypes.Text)
  @IsString()
  @Length(50, 255)
  public textDescription: string;

  @ValidateIf(obj => obj.type === PostTypes.Text)
  @IsString()
  @Length(100, 1024)
  public textContent: string;

  @ApiProperty({
    description: 'Video description',
    example: 'Funny cats'
  })
  @ValidateIf(obj => obj.type === PostTypes.Video)
  @IsString()
  @Length(20, 50)
  public videoTitle: string;

  @ApiProperty({
    description: 'YouTube video link URL',
    example: 'https://www.youtube.com/watch?v=F6va6tg62qg'
  })
  @ValidateIf(obj => obj.type === PostTypes.Video)
  @IsUrl()
  @Matches(YOUTUBE_REGEXP)
  public videoUrl: string;

  @ValidateIf(obj => obj.type === PostTypes.Photo)
  @IsUrl()
  public photoUrl: string;

  @Transform(({ value } ) => value === 'true')
  @IsOptional()
  public published: boolean;
}
