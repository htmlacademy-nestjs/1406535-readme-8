import { registerAs } from '@nestjs/config';
import { Default, ENVIRONMENTS, ValidationInfo } from '@project/shared-types';
import Joi from 'joi';

type Environment = typeof ENVIRONMENTS[number];

export interface ApplicationConfig {
  environment: string;
  port: number;
}

const validationSchema = Joi.object({
  environment: Joi.string().valid(...ENVIRONMENTS).required(),
  port: Joi.number().port().default(Default.DefaultPort),
});

function validateConfig(config: ApplicationConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });
  if (error) {
    throw new Error(`[${ValidationInfo.AppConfigError}]: ${error.message}`);
  }
}

function getConfig(): ApplicationConfig {
  const config: ApplicationConfig = {
    environment: process.env.NODE_ENV as Environment,
    port: parseInt(process.env.PORT || `${Default.DefaultPort}`, 10),
  };

  validateConfig(config);
  return config;
}

export default registerAs('application', getConfig);
