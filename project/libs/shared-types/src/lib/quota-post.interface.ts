import { Post } from './post.interface';

export interface QuotaPost extends Post {
  quotaText: string;
  quotaAuthor: string;
}
