import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { BlogController } from './blog.controller';
import { ApiConfigModule } from './api-config.module';
import { getHttpOptions } from '@project/shared-helpers';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule.registerAsync({
      inject: [ConfigService],
      useFactory: getHttpOptions,
    }),
    ApiConfigModule,
  ],
  controllers: [
    UsersController,
    BlogController,
  ],
  providers: [CheckAuthGuard],
})
export class AppModule {}
