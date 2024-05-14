import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from "@golevelup/nestjs-rabbitmq";
import * as nodemailer from 'nodemailer';
import { hostingerSMTPConfig } from "../configs/hostinger.smtp.config";

@Injectable()
export class MailSenderService {
  private transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport(hostingerSMTPConfig);
  }
  @RabbitSubscribe({
    exchange: 'USER_REGISTRATION',
    routingKey: 'REQUEST',
    queue: 'REGISTRATION_REQUEST'
  })
  public async toSendMailOfConfirmRegistration(message: {
    message: string,
    email: string,
    confirmationCode: string
  }) {
    console.log('message:', message);
    try {
      const mailOptions = {
        from: 'info@stable-exchange.top',
        to: message.email,
        subject: 'Confirm registration',
        html: `
          <p>For confirm registration click link below</p>
          <a href='http://${
            process.env.HOST as string || 'localhost:5173'
          }/customer-account/confirm-registration?confirmationCode=${message.confirmationCode}'>
          CONFIRM
          </a>
        `
      };
      await this.transporter.sendMail(mailOptions);
    } catch (err) {
      throw new Error('Error in sending mail of confirm registration:'.concat(err));
    }
  }
}
