import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { getMailerAsyncOptions } from '@project/shared-helpers';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync(getMailerAsyncOptions('mail')),
  ],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}
