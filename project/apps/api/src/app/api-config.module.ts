import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfig, GatewayConfig } from '@project/shared-configurations';

const APP_ENV = 'apps/api/api.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [AppConfig, GatewayConfig],
      envFilePath: APP_ENV,
    }),
  ]
})
export class ApiConfigModule {}
