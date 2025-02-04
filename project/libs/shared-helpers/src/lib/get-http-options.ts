import { HttpModuleOptions } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

export function getHttpOptions(configService: ConfigService): HttpModuleOptions {
  return {
    timeout: configService.get<number>('gateway.timeout'),
    maxRedirects: configService.get<number>('gateway.maxDirects'),
  }
}
