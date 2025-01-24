export const ApplicationServiceURL = {
  Users: 'http://localhost:3010/api/auth',
  Posts: 'http://localhost:3020/api/posts',
  Comments: 'http://localhost:3020/api/comments',
} as const;

export const HTTP_CLIENT_MAX_REDIRECTS = 5;
export const HTTP_CLIENT_TIMEOUT = 3000;
