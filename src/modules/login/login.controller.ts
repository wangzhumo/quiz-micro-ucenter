import { Controller } from '@nestjs/common'
import { LoginService } from './login.service'
import { GrpcMethod } from '@nestjs/microservices'
import {
    AuthSignInReq,
    AuthSignInResp,
    AuthSignUpReq,
    AuthSignUpResp,
    LoginAuthReq,
    LoginAuthResp,
    RegisterReq,
    RegisterResp,
} from './login.interface'
import { StatusCheck } from '../../common/status'
import { ErrorCode } from '../../common/errorcode'

@Controller()
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @GrpcMethod('UCenterService', 'LoginAuth')
    async LoginAuth(params: LoginAuthReq): Promise<LoginAuthResp> {
        const { identityType, identity, credential } = params
        const res = await this.loginService.validateUser(identityType, identity, credential)
        return res
    }

    /**
     * register new account
     * @constructor
     * @param params
     */
    @GrpcMethod('UCenterService', 'Register')
    async Register(params: RegisterReq): Promise<RegisterResp> {
        const { nick, identityType, identity, credential } = params
        const ret = await this.loginService.registerAccount(nick, identityType, identity, credential)
        console.log('Register controller', ret)
        return ret
    }

    /**
     * 登录时验证
     * @param params
     * @constructor
     */
    @GrpcMethod('UCenterService', 'AuthSignIn')
    async AuthSignIn(params: AuthSignInReq): Promise<AuthSignInResp> {
        console.log('AuthSignIn', params)
        return StatusCheck.Code(ErrorCode.AUTH_Ok)
    }

    /**
     * 创建时生成
     * @param params
     * @constructor
     */
    @GrpcMethod('UCenterService', 'AuthSignUp')
    async AuthSignUp(params: AuthSignUpReq): Promise<AuthSignUpResp> {
        console.log('AuthSignUp', params)
        return StatusCheck.Code(ErrorCode.AUTH_Failure)
    }
}
