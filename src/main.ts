import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  MicroserviceOptions,
  TcpOptions,
  Transport,
} from '@nestjs/microservices';
import 'reflect-metadata';
import { WinstonModule } from "nest-winston";
import { createLogger } from "winston";

async function bootstrap() {
  // createLogger of Winston
  const instance = createLogger({
    // options of Winston
  });
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: 8000,
        host: '0.0.0.0',
      },
      logger: WinstonModule.createLogger({
        instance: instance
      })
    } as TcpOptions,
  );
  await app.listen();
}

bootstrap();
