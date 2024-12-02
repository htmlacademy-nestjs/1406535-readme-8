export interface User {
  id?: string;
  email: string;
  fullName: string;
  avatar?: string;
  registerDate: Date;
  postsCount?: number;
  subscribersCount?: number;
}
