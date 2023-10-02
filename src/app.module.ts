import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../config/configuration';
import { AccountModule } from './modules/account/account.module';
import { AuthAccountModule } from './modules/authAccount/auth.module';
import { LoginModule } from './modules/login/login.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountAuthInfo } from './database/entity/authAccount';
import { AccountBaseInfo } from './database/entity/baseAccount';
import { DataSource } from 'typeorm';
import { WinstonModule } from "nest-winston";
import * as winston from 'winston';
import 'winston-daily-rotate-file';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('Database.host'),
        port: configService.get<number>('Database.port'),
        username: configService.get<string>('Database.user'),
        password: configService.get<string>('Database.password'),
        database: configService.get<string>('Database.name'),
        synchronize: true,
        logging: true,
        entities: [AccountAuthInfo, AccountBaseInfo],
      }),
      dataSourceFactory: async (options) => {
        return await new DataSource(options).initialize();
      },
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      ignoreEnvFile: false,
      load: [configuration],
    }),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.DailyRotateFile({
          dirname: `logs`, // log dir
          filename: '%DATE%.log', // log file name
          datePattern: 'YYYY-MM-DD', // looper duration
          zippedArchive: true, // zip
          maxSize: '20m', // max size
          maxFiles: '14d', // save max day
          format: winston.format.combine(
            winston.format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss',
            }),
            winston.format.json(),
          )
        })
      ]
    }),
    AccountModule,
    AuthAccountModule,
    LoginModule
  ],
})
export class AppModule {}
