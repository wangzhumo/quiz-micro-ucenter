import { Injectable } from '@nestjs/common';
import { accountRepository } from "./account.repository";

@Injectable()
export class AccountService {

  async CreateAccount(nick?: string, avatar?: string, region?: string) {
    return await accountRepository.insertBaseAccount(nick, avatar, region)
  }

  async findBaseAccount(uid?: string) {
    return await accountRepository.findAccount(uid)
  }

}
