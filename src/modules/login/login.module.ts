import { Module } from '@nestjs/common'
import { LocalStrategy } from './local.strategy'
import { PassportModule } from '@nestjs/passport'
import { AuthAccountModule } from '../authAccount/auth.module'
import { LoginService } from './login.service'
import { LoginController } from './login.controller'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from '../../common/constants'

@Module({
    imports: [
        AuthAccountModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {
                expiresIn: '60s',
            },
        }),
    ],
    controllers: [LoginController],
    providers: [LocalStrategy, LoginService],
    exports: [LoginService],
})
export class LoginModule {}
