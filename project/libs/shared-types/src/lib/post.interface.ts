import { PostTypes } from './common.constant';
import { Comment } from './comment.interface';

export interface Post {
  id?: string;
  type: (typeof PostTypes)[keyof typeof PostTypes];
  createdAt?: Date;
  updatedAt?: Date;
  userId: string;
  published: boolean;
  reposted: boolean;
  content: unknown;
  tags?: string[];
  comments?: Comment[];
}
