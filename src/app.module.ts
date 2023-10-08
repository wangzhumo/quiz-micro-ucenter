import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AccountModule } from './modules/account/account.module'
import { AuthAccountModule } from './modules/authAccount/auth.module'
import { LoginModule } from './modules/login/login.module'
import { WinstonModule } from 'nest-winston'
import * as winston from 'winston'
import 'winston-daily-rotate-file'
import Configuration from './configuration'
import { ThrottlerModule } from '@nestjs/throttler'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [Configuration],
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
                    ),
                }),
            ],
        }),
        ThrottlerModule.forRootAsync({
            inject: [ConfigService],
            imports: [ConfigModule],
            useFactory: (config: ConfigService) => [
                {
                    ttl: config.get('throttler.ttl'),
                    limit: config.get('throttler.limit'),
                },
            ],
        }),
        AccountModule,
        AuthAccountModule,
        LoginModule,
    ],
})
export class AppModule {}
