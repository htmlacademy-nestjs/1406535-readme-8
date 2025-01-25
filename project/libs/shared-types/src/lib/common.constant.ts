export const ApiResponseMessage = {
  LoggedSuccess: 'User has been successfully logged',
  LoggedError: 'Password/login is wrong',
  NonLogged: 'Authorization required',
  Forbidden: 'Access denied',
  UserCreated: 'The new user has been successfully created',
  UserFound: 'User found',
  UserNotFound: 'User not found',
  UserExist: 'User with such email already exists',
  CommentCreated: 'The new comment has been successfully created',
  CommentsFound: 'Comments for all posts/required post found',
  CommentFound: 'Comment found',
  CommentNotFound: 'Comment not found',
  CommentDeleted: 'Comment has been successfully deleted',
  CommentUpdated: 'Comment has been successfully updated',
  PostCreated: 'The new post has been successfully created',
  PostFound: 'Post found',
  PostNotFound: 'Post not found',
  PostDeleted: 'Post has been successfully deleted',
  PostUpdated: 'Post has been successfully updated',
  ServerError: 'Internal server error',
  TokenGenerationError: 'Token generation error',
  InvalidID: 'Invalid ID (uuid is expected)',
  BadData: 'Wrong data',
  FileUploadError: 'File saving fail',
  FileNotFound: 'File not found',
  TokenNotFound: 'Token does not exists',
} as const;

export const SortDirection = {
  Asc: 'asc',
  Desc: 'desc',
} as const;

export const Default = {
  GlobalPrefix: 'api',
  SpecificationPrefix: 'spec',
  ServeRoot: '/static',
  DefaultPort: 3000,
  MongoDefaultPort: 27017,
  PosgresDefaultPort: 5432,
  RabbitDefaultPort: 5672,
  SmtpDefaultPort: 25,
  SortDirection: SortDirection.Desc,
  PageNumber: 1,
  MaxRedirects: 5,
  Timeout: 3000,

} as const;

export const ENVIRONMENTS = ['development', 'production', 'stage'] as const;

export const ValidationInfo = {
  AppConfigError: 'Application configuration validity error',
  MongodbConfigError: 'MongoDB configuration validity error',
  JwtConfigError: 'Account JWTConfig validity error',
  PipeImproperUsage: 'This pipe must used only with params!',
  FileStorageConfigError: 'FileStorage configuration validity error',
  NofityServiceConfigError: 'Notify configuration validity error',
  RabbitConfigError: 'RabbitMQ configuration validity error',
  GatewayConfigError: 'Gateway configuration validity error',
} as const;

export const MongodbInfo = {
  EntityNotFound: 'Entity not found',
  InvalidID: 'Validation failed (mongoId is expected)',
} as const;

export const PostTypes = {
  Text: 'TEXT',
  Video: 'VIDEO',
  Quota: 'QUOTA',
  Photo: 'PHOTO',
  Link: 'LINK',
} as const;

export const SortType = {
  Date: 'time',
  Favorite: 'like',
  Discussed: 'comment',
} as const;

export const RabbitRouting = {
  AddSubscriber: 'notify.addSubscriber',
} as const;

export const Status = {
  All: 'all',
  Draft: 'draft',
  Published: 'published',
}

export const ApplicationServiceURL = {
  Users: 'http://localhost:3010/api/auth',
  Posts: 'http://localhost:3020/api/posts',
  Comments: 'http://localhost:3020/api/comments',
} as const;
