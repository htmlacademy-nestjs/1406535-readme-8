export interface Comment {
  id?: string;
  text: string;
  authorId: string;
  postId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
