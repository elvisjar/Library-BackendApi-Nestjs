import { registerAs } from '@nestjs/config';

export interface MailerConfig {
  user: string;
  pass: string;
  host: string;
  port: number;
  verificationSecret: string;
}

export default registerAs(
  'mailer',
  (): MailerConfig => ({
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT),
    verificationSecret: process.env.MAIL_VERIFICATION_SECRET,
  }),
);
