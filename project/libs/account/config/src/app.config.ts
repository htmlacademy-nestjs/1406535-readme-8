import { ConfigType, registerAs } from '@nestjs/config';
import { Default, ENVIRONMENTS } from '@project/shared-types';
import { plainToClass } from 'class-transformer';
import { IsIn, IsOptional, IsPort, IsString, validateOrReject } from 'class-validator';

export interface ApplicationConfig {
  environment: string;
  port: number;
}

export class AppConfiguration {
  @IsString()
  @IsIn(ENVIRONMENTS)
  public environment: string;

  // @IsNumber()
  // @Min(MIN_PORT)
  // @Max(MAX_PORT)
  @IsPort()
  @IsOptional()
  public port: number = Default.DefaultPort;

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
};

async function getConfig(): Promise<AppConfiguration> {
  const config = plainToClass(AppConfiguration, {
    environment: process.env.NODE_ENV,
    port: process.env.PORT,
  });

  await config.validate();

  return config;
}

export default registerAs('application', async (): Promise<ConfigType<typeof getConfig>> => {
  return getConfig();
});
