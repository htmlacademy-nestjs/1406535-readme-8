import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongooseOptions } from '@project/shared-helpers';
import { NotifyConfigModule } from './notify-config.module';
import { EmailSubscriberModule } from '@project/notification';
@Module({
  imports: [
    MongooseModule.forRootAsync(
      getMongooseOptions('application.db')
    ),
    NotifyConfigModule,
    EmailSubscriberModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
