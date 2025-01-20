import { Module } from '@nestjs/common';
import { CommentModule } from '@project/blog-comment';
import { BlogConfigModule } from '@project/blog-config';
import { PostModule } from '@project/blog-post';

@Module({
  imports: [CommentModule, PostModule, BlogConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
