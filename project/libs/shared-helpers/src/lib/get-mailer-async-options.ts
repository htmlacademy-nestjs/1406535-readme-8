import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigService } from '@nestjs/config';
import { resolve } from 'node:path';

export function getMailerAsyncOptions(nameSpace: string): MailerAsyncOptions {
  return {
    useFactory: async (configService: ConfigService) => {
      return {
        transport: {
          host: configService.get<string>(`${nameSpace}.host`),
          port: configService.get<number>(`${nameSpace}.port`),
          secure: false,
          auth: {
            user: configService.get<string>(`${nameSpace}.user`),
            pass: configService.get<string>(`${nameSpace}.password`)
          }
        },
        defaults: {
          from: configService.get<string>(`${nameSpace}.from`),
        },
        template: {
          dir: resolve(__dirname, 'assets'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true
          }
        }
      }
    },
    inject: [ConfigService],
  }
}
