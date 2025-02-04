import Joi from 'joi';
import { registerAs } from '@nestjs/config';
import { Default, ValidationInfo } from '@project/shared-types';

export interface MediaConfig {
  uploadDirectory: string;
  serveRoot: string;
}

const validationSchema = Joi.object({
  uploadDirectory: Joi.string().required(),
  serveRoot: Joi.string().required(),
});

function validateConfig(config: MediaConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });
  if (error) {
    throw new Error(`[${ValidationInfo.FileStorageConfigError}]: ${error.message}`);
  }
}

function getConfig(): MediaConfig {
  const config: MediaConfig = {
    uploadDirectory: process.env.UPLOAD_DIRECTORY_PATH,
    serveRoot: process.env.SERVE_ROOT ?? Default.ServeRoot,
  };

  validateConfig(config);
  return config;
}

export default registerAs('media', getConfig);
