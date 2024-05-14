import { Module } from '@nestjs/common';
import { MailSenderServiceModule } from './mail-sender-service/mail-sender-service.module';

@Module({
  imports: [MailSenderServiceModule],
})
export class AppModule {}
