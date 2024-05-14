import SmtpConfig from './interfaces/SmtpConfig.interface';

export const hostingerSMTPConfig: SmtpConfig = {
  host: process.env.HOST_SMTP,
  port: Number(process.env.PORT_SMTP),
  secure: false,
  auth: {
    user: process.env.USER_SMTP,
    pass: process.env.PASS_SMTP
  }
}
