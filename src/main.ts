import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices/interfaces';
import { AppModule } from './app.module';
import { KafkaConsumerService } from './messaging/kafka/kakfa-consumer.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  if(process.env.KAFKA_BROKER){
    const kafkaConsumerService = app.get(KafkaConsumerService)
    app.connectMicroservice<MicroserviceOptions>({
      strategy: kafkaConsumerService
    })

    await app.startAllMicroservices()
  }
  
  await app.listen(3000);
}
bootstrap();
