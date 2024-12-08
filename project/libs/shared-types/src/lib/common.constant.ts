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
} as const;

export const ENVIRONMENTS = ['development', 'production', 'stage'] as const;

export const ValidationInfo = {
<<<<<<< HEAD
  AppConfigError: 'Application\'s configuration validaty error',
  MongoConfigError: 'MongoDB configuration validaty error',
} as const;
=======
  AppConfigError: 'Application configuration validaty error',
  MongodbConfigError: 'MongoDB configuration validaty error',
}
>>>>>>> 8310ab1 (сделала конфиги для app и mongo, использую валидацию joi)
