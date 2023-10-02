import { MessagePattern } from "@nestjs/microservices";
import { AccountAuthInfo } from "../accounts";
import { Controller } from "@nestjs/common";
import { AuthAccountService } from "./authAccount.service";


@Controller()
export class AuthAccountController {
  constructor(private readonly authService: AuthAccountService) {}

  @MessagePattern({ cmd: 'third_check' })
  async AuthCheck(identityType: number, identity: string) {
    const res = await this.authService.AuthCheck(identityType, identity);
  }

  @MessagePattern({ cmd: 'auth_account' })
  AuthAccount(authInfo: AccountAuthInfo) {
    return this.authService.AuthAccount(authInfo)
  }
}

