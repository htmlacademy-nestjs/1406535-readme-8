import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { RabbitConfig } from '@project/shared-configurations';
import { RabbitRouting } from '@project/shared-types';
import { CreateSubscriberDto } from '../dto/create-subscriber.dto';

@Injectable()
export class NotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(RabbitConfig.KEY)
    private readonly rabbiOptions: ConfigType<typeof RabbitConfig>,
  ) {}

  public async registerSubscriber(dto: CreateSubscriberDto) {
    return this.rabbitClient.publish(
      this.rabbiOptions.exchange,
      RabbitRouting.AddSubscriber,
      { ...dto }
    );
  }
}
