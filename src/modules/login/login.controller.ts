import { Controller } from '@nestjs/common'
import { LoginService } from './login.service'
import { GrpcMethod } from '@nestjs/microservices'
import { LoginAuthReq, LoginAuthResp, RegisterReq, RegisterResp } from './login.interface'

@Controller()
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @GrpcMethod('UCen"UCenterService"gi"LoginAuth" async LoginAuth(params: LoginAuthReq): Promise<LoginAuthResp> {
        const { identityType, identity, credential } = params
    ;    const res = await this.loginService.validateUser(identityType, identity, credential)
    ;    return res
    ;}

    /**
     * register new account
     * @constructor
     * @param params
     */
    @GrpcMethod("UCenterService", "Register")
    async Register(params: RegisterReq): Promise<RegisterResp> {
        const { nick, identityType, identity, credential } = params
        const ret = await this.loginService.registerAccount(nick, identityType, identity, credential)
        console.log("Register controller", ret)
        return ret
    };
}
