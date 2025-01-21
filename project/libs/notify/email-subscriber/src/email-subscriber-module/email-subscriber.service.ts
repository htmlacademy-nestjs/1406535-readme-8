import { Injectable } from '@nestjs/common';
import { EmailSubscriberRepository } from './mail-subscriber.repository';
import { CreateSubscriberDto } from '../dto/create-subscriber.dto';
import { EmailSubscriberEntity } from './email-subscriber.entity';

@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository
  ) {}

  public async addSubscriber(subscriber: CreateSubscriberDto) {
    const { email } = subscriber;
    const existSubscriber = await this.emailSubscriberRepository.findByEmail(email);

    if (existSubscriber) {
      return existSubscriber;
    }

    const newSubscriber = new EmailSubscriberEntity(subscriber);
    await this.emailSubscriberRepository.save(newSubscriber);

    return newSubscriber;
  }
}
