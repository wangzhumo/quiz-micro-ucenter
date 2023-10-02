import { Controller } from '@nestjs/common';
import { AccountService } from './account.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @MessagePattern({ cmd: 'create_account' })
  async CreateBaseAccount(nick?: string, avatar?: string, region?: string) {
    const user = this.accountService.CreateAccount(nick, avatar, region);
    return {
      data: user,
      code: 0
    };
  }

  @MessagePattern({ cmd: 'find_account' })
  async GetAccount(accountId: string) {
    const user = await this.accountService.findBaseAccount(accountId);
    return {
      data: user,
      code: 0
    };
  }
}
