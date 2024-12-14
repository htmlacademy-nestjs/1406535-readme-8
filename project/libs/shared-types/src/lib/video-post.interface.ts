import { Post } from './post.interface';

export interface VideoPost extends Post {
  videoTitle: string;
  videoUrl: string;
}
