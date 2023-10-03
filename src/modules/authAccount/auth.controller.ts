import { MessagePattern } from '@nestjs/microservices'
import { Controller } from '@nestjs/common'
import { AuthAccountService } from './authAccount.service'

@Controller()
export class AuthAccountController {
    constructor(private readonly authService: AuthAccountService) {}

    @MessagePattern({ cmd: 'third_check' })
    async AuthCheck(params: any) {
        const { identityType, identity } = params
        return this.authService.AuthCheck({identityType, identity})
    }

    @MessagePattern({ cmd: 'auth_account' })
    async AuthAccount(params: any) {
        return this.authService.AuthAccount(params)
    }
}
