import { Post } from './post.interface';

export interface TextPost extends Post {
  textTitle: string;
  textDescription: string;
  textContent: string;
}
