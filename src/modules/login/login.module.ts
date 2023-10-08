import { Module } from '@nestjs/common'
import { AuthAccountModule } from '../authAccount/auth.module'
import { LoginService } from './login.service'
import { LoginController } from './login.controller'

@Module({
    imports: [AuthAccountModule],
    controllers: [LoginController],
    providers: [LoginService],
    exports: [LoginService],
})
export class LoginModule {}
