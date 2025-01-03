import { ApiProperty } from '@nestjs/swagger';
import { PostTypes } from '@project/shared-types';
import { Transform } from 'class-transformer';
import { ArrayMaxSize, IsArray, IsIn, IsMongoId, IsOptional, IsString, IsUrl, Length, Matches, MaxLength, NotContains, ValidateIf } from 'class-validator';

const YOUTUBE_REGEXP = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/gi;
const SPACE_SIGN = ' ';

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

  //Должен начинаться с буквы
  @IsArray()
  @IsString({ each: true })
  @Length(3, 10, { each: true })
  @NotContains(SPACE_SIGN, { each: true })
  @Transform(({ value }) => value.map(item => item.toLowerCase()))
  @Transform(({ value }) => Array.from(new Set(value)))
  @ArrayMaxSize(8)
  @IsOptional()
  public tags: string[];

  @ApiProperty({
    description: 'Valid URL address',
    example: 'https://ya.ru/'
  })
  @ValidateIf(obj => obj.type === PostTypes.Link)
  @IsUrl()
  public linkUrl: string;

  @ApiProperty({
    description: 'Description text for link (optional, max: 300 chars)',
    example: 'Advanced multilingual search engine'
  })
  @ValidateIf(obj => obj.type === PostTypes.Link)
  @IsString()
  @MaxLength(300)
  @IsOptional()
  public linkDescription: string;

  @ApiProperty({
    description: 'Some awesome quotation 20-300 chars length',
    example: 'Only two things are infinite — the universe and human stupidity, and I\'m not sure about the former.'
  })
  @ValidateIf(obj => obj.type === PostTypes.Quota)
  @IsString()
  @Length(20, 300)
  public quotaText: string;

  @ApiProperty({
    description: 'Quotation\'s author',
    example: 'Albert Einstein'
  })
  @ValidateIf(obj => obj.type === PostTypes.Quota)
  @IsString()
  @Length(3, 50)
  public quotaAuthor: string;

  @ApiProperty({
    description: '20-50 chars clickbait article\'s title',
    example: 'Were the Maya right: "Are we going to die tomorrow?"'
  })
  @ValidateIf(obj => obj.type === PostTypes.Text)
  @IsString()
  @Length(20, 50)
  public textTitle: string;

  @ApiProperty({
    description: 'Some brief description for your article (50-255 chars length)',
    example: 'The article examines the beliefs of the Maya people that have survived to the present day.'
  })
  @ValidateIf(obj => obj.type === PostTypes.Text)
  @IsString()
  @Length(50, 255)
  public textDescription: string;

  @ApiProperty({
    description: 'Amazing article (100-1024 chars)',
    example: 'Absolutely all great civilizations leave prophecies and prescriptions to their descendants. Maya, as one of the most famous ancient ones, was no exception. Surprisingly, the Maya predicted many dates on which many important events for humanity were to take place. \nIf great human minds have correctly deciphered the prophecies of the Maya, then people should meet the New Era on their way. But there is a fear that a New Era will come along with many natural disasters that will affect the whole world.'
  })
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

  // @ApiProperty({
  //   description: 'Optional text description for link',
  //   example: 'https://ya.ru/'
  // })
  @ValidateIf(obj => obj.type === PostTypes.Photo)
  @IsUrl()
  public photoUrl: string;
}
