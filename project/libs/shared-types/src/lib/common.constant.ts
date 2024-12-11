export const AccountInfo = {
  LoggedSuccess: 'User has been successfully logged',
  LoggedError: 'Password/login is wrong',
  UserFound: 'User found',
  UserNotFound: 'User not found',
  UserExist: 'User with such email already exists',
  UserCreated: 'The new user has been successfully created',
} as const;

export const Default = {
  GlobalPrefix: 'api',
  SpecificationPrefix: 'spec',
  DefaultPort: 3000,
  MongoDefaultPort: 27017,
  PosgresDefaultPort: 5432,
} as const;

export const ENVIRONMENTS = ['development', 'production', 'stage'] as const;

export const ValidationInfo = {
  AppConfigError: 'Application configuration validity error',
  MongodbConfigError: 'MongoDB configuration validity error',
} as const;

export const MongodbInfo = {
  EntityNotFound: 'Entity not found',
} as const;

export const PostTypes = {
  Text: 'TEXT',
  Video: 'VIDEO',
  Quota: 'QUOTA',
  Photo: 'PHOTO',
  Link: 'LINK',
} as const;
