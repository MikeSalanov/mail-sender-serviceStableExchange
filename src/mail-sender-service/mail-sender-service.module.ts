import { Module } from '@nestjs/common';
import { MailSenderServiceController } from './mail-sender-service.controller';
import { MailSenderService } from './mail-sender-service';
import { RabbitMQModule } from "@golevelup/nestjs-rabbitmq";

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      useFactory: () => ({
        exchanges: [
          {
            name: 'USER_REGISTRATION',
            type: 'direct',
          },
        ],
        uri: process.env.RABBIT_URL as string,
        connectionInitOptions: { wait: false, reject: false },
        enableControllerDiscovery: true,
        queues: [
          {
            name: 'REGISTRATION_REQUEST',
            options: {
              durable: true
            }
          },
        ],
      })
    }),
  ],
  controllers: [MailSenderServiceController],
  providers: [MailSenderService]
})
export class MailSenderServiceModule {}
