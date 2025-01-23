import { ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { getMongoConnectionString } from './common';

export function getMongooseOptions(nameSpace: string): MongooseModuleAsyncOptions {
  return {
    useFactory: async (config: ConfigService) => {
      return {
        uri: getMongoConnectionString({
          username: config.get<string>(`${nameSpace}.user`),
          password: config.get<string>(`${nameSpace}.password`),
          host: config.get<string>(`${nameSpace}.host`),
          port: config.get<string>(`${nameSpace}.port`),
          authDatabase: config.get<string>(`${nameSpace}.authBase`),
          databaseName: config.get<string>(`${nameSpace}.name`),
        })
      }
    },
    inject: [ConfigService]
  }
}
