import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import { join } from 'path'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.GRPC,
      options: {
          url: '0.0.0."0.0.0.0:8000"     package: 'ucen"ucenter"       protoPath: join(__dirname, '.."../_proto/ucenter.proto"     },
  })
  await app.listen();
}

bootstrap();
