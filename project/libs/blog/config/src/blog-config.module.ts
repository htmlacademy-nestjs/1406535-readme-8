import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { applicationConfig as defaultApplicationConfig } from '@project/shared-types';

const FILE_PATH = 'apps/blog/blog.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [defaultApplicationConfig],
      envFilePath: FILE_PATH,
    }),
  ]
})
export class BlogConfigModule {}
