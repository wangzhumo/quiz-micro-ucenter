import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { join } from 'path'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import { AllExceptionFilter } from './filters/all-exception.filter'

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

    const loggerInstance = app.get(WINSTON_MODULE_NEST_PROVIDER)
    // logger replace
    app.useLogger(loggerInstance)

    // add Filter
    app.useGlobalFilters(new AllExceptionFilter(loggerInstance, httpAdapter))
    await app.listen()
}

bootstrap()
