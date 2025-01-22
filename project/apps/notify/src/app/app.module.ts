import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailSubscriberModule } from '@project/email-subscriber';
import { NotifyConfigModule } from '@project/notify-config';
import { getMongooseOptions } from '@project/shared-helpers';
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
