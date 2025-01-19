import { registerAs } from '@nestjs/config';
import { Default, ENVIRONMENTS, ValidationInfo } from '@project/shared-types';
import Joi from 'joi';

type Environment = typeof ENVIRONMENTS[number];

export interface MediaConfig {
  environment: string;
  port: number;
  uploadDirectory: string;
}

const validationSchema = Joi.object({
  environment: Joi.string().valid(...ENVIRONMENTS).required(),
  port: Joi.number().port().default(Default.DefaultPort),
  uploadDirectory: Joi.string().required(),
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
    port: parseInt(process.env.PORT || `${Default.DefaultPort}`, 10),
    uploadDirectory: process.env.UPLOAD_DIRECTORY_PATH,
  };

  validateConfig(config);
  return config;
}

export default registerAs('application', getConfig);
