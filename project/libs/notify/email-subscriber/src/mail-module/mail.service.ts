import { MailerService } from '@nestjs-modules/mailer'
import { Inject, Injectable } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { NotifyConfig } from '@project/notify-config'
import { Subscriber } from '@project/shared-types'

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  @Inject(NotifyConfig.KEY)
  private readonly notifyConfig: ConfigType<typeof NotifyConfig>

  public async sendNotifyNewSubscriber(subscriber: Subscriber) {
    await this.mailerService.sendMail({
      from: this.notifyConfig.mail.from,
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
