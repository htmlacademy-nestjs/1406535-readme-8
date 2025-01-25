import { MailerService } from '@nestjs-modules/mailer'
import { Inject, Injectable } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { MailConfig } from '@project/shared-configurations'
import { Subscriber } from '@project/shared-types'

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  @Inject(MailConfig.KEY)
  private readonly mailConfig: ConfigType<typeof MailConfig>

  public async sendNotifyNewSubscriber(subscriber: Subscriber) {
    await this.mailerService.sendMail({
      from: this.mailConfig.from,
      to: subscriber.email,
      subject: 'The subscription has been issued',
      template: './add-subscriber',
      context: {
        user: `${subscriber.fullName}`,
        email: `${subscriber.email}`,
      }
    })
  }
}
