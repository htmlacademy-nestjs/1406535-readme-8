import Joi from 'joi';
import { registerAs } from '@nestjs/config';
import { Default, ValidationInfo } from '@project/shared-types';

export interface GatewayConfig {
  maxRedirects: number;
  timeout: number;
}

const validationSchema = Joi.object({
  maxRedirects: Joi.number().required(),
  timeout: Joi.number().required(),
});

function validateConfig(config: GatewayConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });
  if (error) {
    throw new Error(`[${ValidationInfo.GatewayConfigError}]: ${error.message}`);
  }
}

function getConfig(): GatewayConfig {
  const config: GatewayConfig = {
    maxRedirects: parseInt(process.env.HTTP_CLIENT_MAX_REDIRECTS ?? `${Default.MaxRedirects}`, 10),
    timeout: parseInt(process.env.HTTP_CLIENT_TIMEOUT ?? `${Default.Timeout}`, 10),
  };

  validateConfig(config);
  return config;
}

export default registerAs('gateway', getConfig);
