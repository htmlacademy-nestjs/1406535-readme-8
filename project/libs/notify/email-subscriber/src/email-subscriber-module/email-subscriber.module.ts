import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailSubscriberModel, EmailSubscriberSchema } from './email-subscriber.model';
import { EmailSubscriberService } from './email-subscriber.service';
import { EmailSubscriberRepository } from './mail-subscriber.repository';
import { EmailSubscriberFactory } from './email-subscriber.factory';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq/lib/rabbitmq.module';
import { getRabbitMQOptions } from '@project/shared-helpers';
import { EmailSubscriberController } from './email-subscriber.controller';
import { MailModule } from '../mail-module/mail.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EmailSubscriberModel.name, schema: EmailSubscriberSchema }
    ]),
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('application.rabbit')
    ),
    MailModule,
  ],
  providers: [
    EmailSubscriberService,
    EmailSubscriberRepository,
    EmailSubscriberFactory,
  ],
  controllers: [EmailSubscriberController]
})
export class EmailSubscriberModule {}
