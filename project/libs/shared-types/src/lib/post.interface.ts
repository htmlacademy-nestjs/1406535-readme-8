import { PostTypes } from './common.constant';

export interface Post {
  id?: string;
  type: typeof PostTypes;
  createdAt?: Date;
  updatedAt?: Date;
  userId: string;
  published: boolean;
  reposted: boolean;
  tags: string[];
  comments: Comment[];
}
