import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { ConfigType } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import mailerConfig from 'src/common/configs/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule,
    MailerModule.forRootAsync({
      inject: [mailerConfig.KEY],
      useFactory: async (config: ConfigType<typeof mailerConfig>) => ({
        transport: {
          host: config.host,
          port: config.port,
          secure: false,
          auth: {
            user: config.user,
            pass: config.pass,
          },
        },
        defaults: {
          from: `"no-reply" <${config.user}>`,
        },
        template: {
          dir: process.cwd() + '/templates/',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],

  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
