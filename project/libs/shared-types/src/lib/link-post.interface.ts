import { Post } from './post.interface';

export interface LinkPost extends Post {
  linkUrl: string;
  linkDescription?: string;
}
