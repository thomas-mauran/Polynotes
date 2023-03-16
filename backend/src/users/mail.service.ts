import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendEmailVerificationLink(to: string, token: string) {
    const baseUrl = this.configService.get('APP_BASE_URL');

    const verificationLink = `${baseUrl}/users/verify-email/${token}`;

    const mailOptions = {
      to,
      subject: '📝 Polynote mail verification',
      html: `
      <div align="center"> 
        <h1>Welcome 👋</h1>
        <p>Please click the following link to verify your email address:</p><p><a href="${verificationLink}">${verificationLink}</a></p>
      </div>
      `,
    };

    return this.mailerService.sendMail(mailOptions);
  }
}
