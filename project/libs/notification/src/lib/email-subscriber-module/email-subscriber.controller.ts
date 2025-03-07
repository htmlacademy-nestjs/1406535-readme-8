import { Controller } from '@nestjs/common';
import { EmailSubscriberService } from './email-subscriber.service';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { RabbitRouting } from '@project/shared-types';
import { CreateSubscriberDto } from '../dto/create-subscriber.dto';
import { MailService } from '../mail-module/mail.service';

@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
    private readonly mailService: MailService,
  ) {}

  @RabbitSubscribe({
    exchange: 'notify',
    routingKey: RabbitRouting.AddSubscriber,
    queue: 'notify',
  })
  public async create(subscriber: CreateSubscriberDto) {
    this.subscriberService.addSubscriber(subscriber);
    this.mailService.sendNotifyNewSubscriber(subscriber);
  }
}
