import { registerAs } from '@nestjs/config';
import { Default, ENVIRONMENTS, ValidationInfo } from '@project/shared-types';
import Joi from 'joi';

type Environment = typeof ENVIRONMENTS[number];

export interface MediaConfig {
  environment: string;
  port: number;
  uploadDirectory: string;
  db: {
    host: string;
    port: number;
    user: string;
    name: string;
    password: string;
    authBase: string;
  }
}

const validationSchema = Joi.object({
  environment: Joi.string().valid(...ENVIRONMENTS).required(),
  port: Joi.number().port().default(Default.DefaultPort),
  uploadDirectory: Joi.string().required(),
  db: Joi.object({
    host: Joi.string().valid().hostname(),
    port: Joi.number().port(),
    name: Joi.string().required(),
    user: Joi.string().required(),
    password: Joi.string().required(),
    authBase: Joi.string().required(),
  })
});

function validateConfig(config: MediaConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });
  if (error) {
    throw new Error(`[${ValidationInfo.FileStorageConfigError}]: ${error.message}`);
  }
}

function getConfig(): MediaConfig {
  const config: MediaConfig = {
    environment: process.env.NODE_ENV as Environment,
    port: parseInt(process.env.PORT ?? `${Default.DefaultPort}`, 10),
    uploadDirectory: process.env.UPLOAD_DIRECTORY_PATH,
    db: {
      host: process.env.MONGO_HOST,
      port: parseInt(process.env.MONGO_PORT ?? `${Default.MongoDefaultPort}`, 10),
      name: process.env.MONGO_DB,
      user: process.env.MONGO_USER,
      password: process.env.MONGO_PASSWORD,
      authBase: process.env.MONGO_AUTH_BASE,
    }
  };

  validateConfig(config);
  return config;
}

export default registerAs('application', getConfig);
