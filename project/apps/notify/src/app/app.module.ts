import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailSubscriberModule } from '@project/email-subscriber';
import { getMongooseOptions } from '@project/shared-helpers';
import { NotifyConfigModule } from './notify-config.module';
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
