import { Post } from './post.interface';

export interface PhotoPost extends Post {
  photoUrl: string;
}
