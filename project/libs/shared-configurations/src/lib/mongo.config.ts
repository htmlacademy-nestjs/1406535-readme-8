import Joi from 'joi';
import { registerAs } from '@nestjs/config';
import { Default, ValidationInfo } from '@project/shared-types';

export interface MongoConfig {
  host: string;
  name: string;
  port: number;
  user: string;
  password: string;
  authBase: string;
}

const dbValidationSchema = Joi.object({
  host: Joi.string().hostname().required(),
  port: Joi.number().port().default(Default.MongoDefaultPort),
  name: Joi.string().required(),
  user: Joi.string().required(),
  password: Joi.string().required(),
  authBase: Joi.string().required(),
});

function validateMongoConfig(config: MongoConfig): void {
  const { error } = dbValidationSchema.validate(config, { abortEarly: true });
  if (error) {
    throw new Error(`[${ValidationInfo.MongodbConfigError}]: ${error.message}`);
  }
}

function getConfig(): MongoConfig {
  const config: MongoConfig = {
    host: process.env.MONGO_HOST,
    name: process.env.MONGO_DB,
    port: parseInt(process.env.MONGO_PORT ?? `${Default.MongoDefaultPort}`, 10),
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    authBase: process.env.MONGO_AUTH_BASE,
  };

  validateMongoConfig(config);
  return config;
}

export default registerAs('db', getConfig);
