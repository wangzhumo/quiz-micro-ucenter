import { Controller, Inject, Logger } from '@nestjs/common'
import { LoginService } from './login.service'
import { GrpcMethod } from '@nestjs/microservices'
import {
    AuthSignInReq,
    AuthSignInResp,
    AuthSignUpReq,
    AuthSignUpResp,
    LoginAuthReq,
    LoginAuthResp,
    RegisterResp,
} from './login.interface'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'

@Controller()
export class LoginController {
    constructor(
        private readonly loginService: LoginService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {}

    /**
     * Auto Auth
     * @param params
     * @constructor
     */
    @GrpcMethod('UCenterService', 'LoginAuth')
    async LoginAuth(params: LoginAuthReq): Promise<LoginAuthResp> {
        const { identityType, identity, credential } = params
        const res = await this.loginService.validateUser(identityType, identity, credential)
        return res
    }

    /**
     * login in account
     * @param params
     * @constructor
     */
    @GrpcMethod('UCenterService', 'AuthSignIn')
    async AuthSignIn(params: AuthSignInReq): Promise<AuthSignInResp> {
        console.log('AuthSignIn', params)
        const { identityType, identity, credential } = params
        const ret = await this.loginService.LoginAccount(identityType, identity, credential)
        console.log('Register controller:AuthSignIn', ret)
        return ret
    }

    /**
     * register new account
     * @constructor
     * @param params
     */
    @GrpcMethod('UCenterService', 'AuthSignUp')
    async AuthSignUp(params: AuthSignUpReq): Promise<AuthSignUpResp> {
        const { nick, identityType, identity, credential } = params
        const ret = await this.loginService.registerAccount(nick, identityType, identity, credential)
        this.logger.log('Register controller:Register', ret)
        return ret
    }
}
