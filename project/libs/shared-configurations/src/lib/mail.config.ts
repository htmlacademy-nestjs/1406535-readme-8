import Joi from 'joi';
import { registerAs } from '@nestjs/config';
import { Default, ValidationInfo } from '@project/shared-types';

export interface MailConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  from: string;
}

const validationSchema = Joi.object({
  host: Joi.string().valid().hostname().required(),
  port: Joi.number().port().default(Default.SmtpDefaultPort),
  user: Joi.string().required(),
  password: Joi.string().required(),
  from: Joi.string().required(),
});

function validateConfig(config: MailConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });
  if (error) {
    throw new Error(`[${ValidationInfo.NofityServiceConfigError}]: ${error.message}`);
  }
}

function getConfig(): MailConfig {
  const config: MailConfig = {
    host: process.env.MAIL_SMTP_HOST,
    port: parseInt(process.env.MAIL_SMTP_PORT ?? Default.SmtpDefaultPort.toString(), 10),
    user: process.env.MAIL_USER_NAME,
    password: process.env.MAIL_USER_PASSWORD,
    from: process.env.MAIL_FROM,
  };

  validateConfig(config);
  return config;
}

export default registerAs('mail', getConfig);
