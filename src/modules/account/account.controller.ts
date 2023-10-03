import { Controller } from '@nestjs/common';
import { AccountService } from './account.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @MessagePattern({ cmd: 'create_account' })
  async CreateBaseAccount(params: any) {
    const user = this.accountService.CreateAccount(params.nick, null);
    return {
      data: user,
      code: 0
    };
  }

  @MessagePattern({ cmd: 'find_account' })
  async GetAccount(accountId: string) {
    const bigUid = Number(accountId)
    const user = await this.accountService.findBaseAccount(bigUid);
    return {
      data: user,
      code: 0
    };
  }
}
