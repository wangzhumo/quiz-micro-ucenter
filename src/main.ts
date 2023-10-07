import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { join } from 'path'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import { AllExceptionFilter } from './filters/all-exception.filter'
import { Logger } from '@nestjs/common'

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.GRPC,
        options: {
            url: '0.0.0.0:8000',
            package: 'ucenter',
            protoPath: join(__dirname, './_proto/ucenter.proto'),
        },
    })

    // get httpAdapter
    const httpAdapter = app.get(HttpAdapterHost)

    // logger replace
    app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))

    // add Filter
    const logger = new Logger()
    app.useGlobalFilters(new AllExceptionFilter(logger, httpAdapter))
    await app.listen()
}

bootstrap()
