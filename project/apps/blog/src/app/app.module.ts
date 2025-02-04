import { Module } from '@nestjs/common';
import { CommentModule } from '@project/blog-comment';
import { PostModule } from '@project/blog-post';
import { BlogConfigModule } from './blog-config.module';

@Module({
  imports: [
    BlogConfigModule,
    CommentModule,
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
