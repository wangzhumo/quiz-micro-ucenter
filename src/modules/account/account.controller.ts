import { Controller } from '@nestjs/common';
import { AccountService } from './account.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @MessagePattern({ cmd: 'create_account' })
  async CreateBaseAccount(nick?: string, avatar?: string, region?: string) {
    return this.accountService.CreateAccount(nick, avatar, region);
  }

  @MessagePattern({ cmd: 'find_account' })
  async GetAccount(accountId: string) {
    return this.accountService.findBaseAccount(accountId);
  }
}
