import { Module } from '@nestjs/common';
import { PrismaClientModule } from '@project/blog-models';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  imports: [PrismaClientModule],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
