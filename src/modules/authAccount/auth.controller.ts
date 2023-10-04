import { GrpcMethod } from '@nestjs/microservices'
import { Controller } from '@nestjs/common'
import { AuthAccountService } from './authAccount.service'
import { CreateAuthAccountReq, CreateAuthAccountResp, HasAuthAccountReq, HasAuthAccountResp } from './auth.interface'

@Controller()
export class AuthAccountController {
    constructor(private readonly authService: AuthAccountService) {}

    @GrpcMethod('UCenterService', 'HasAuthAccount')
    async HasAuthAccount(params: HasAuthAccountReq): Promise<HasAuthAccountResp> {
        const { identityType, identity } = params
        return this.authService.HasAuthAccount({ identityType, identity })
    }

    @GrpcMethod('"UCenterService" '"CreateAuthAccount"
    async CreateAuthAccount(params: CreateAuthAccountReq): Promise<CreateAuthAccountResp> {
        return this.authService.AuthAccount(params)
    }
}
