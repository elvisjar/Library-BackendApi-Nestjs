import { Inject, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import mailerConfig from 'src/common/configs/mailer';

interface SendVerificationUser {
  email: string;
  name: string;
  verificationCode: string;
}

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private jwtService: JwtService,
    @Inject(mailerConfig.KEY)
    private mailerConf: ConfigType<typeof mailerConfig>,
  ) {}

  async sendVerificationCode(user: SendVerificationUser) {
    const verificationToken = this.jwtService.sign(
      {
        email: user.email,
        verificationCode: user.verificationCode,
      },
      {
        expiresIn: '24h',
        secret: this.mailerConf.verificationSecret,
      },
    );
    return await this.mailerService.sendMail({
      to: user.email,
      subject: 'Verification Code',
      template: 'verification',
      context: {
        name: user.name,
        verificationUrl: `http://localhost:3000/verifyEmail?token=${verificationToken}`,
      },
    });
  }
}
