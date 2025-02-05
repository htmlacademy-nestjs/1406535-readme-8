import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { ApiConfigModule } from './api-config.module';
import { getHttpOptions } from '@project/shared-helpers';
import { ConfigService } from '@nestjs/config';
import { UsersController } from './controllers/users.controller';
import { BlogController } from './controllers/blog.controller';

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
