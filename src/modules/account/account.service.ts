import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { AccountBaseInfo } from "../../database/entity/baseAccount";
import { Repository } from "typeorm";
import { generator } from "../../database/idgenerator";

@Injectable()
export class AccountService {

  constructor(@InjectRepository(AccountBaseInfo)
              private readonly accountRepository: Repository<AccountBaseInfo>) {}

  async CreateAccount(nick?: string, avatar?: string, region?: string) {
    const account = new AccountBaseInfo();
    account.status = 0;
    account.avatar = avatar;
    account.nick = nick;
    account.region = region;
    account.createAt = Date.now();
    account.uid = generator.nextId();
    account.lastAt = account.createAt;
    return await this.accountRepository.save(account)
  }

  async findBaseAccount(uid?: string) {
    return await this.accountRepository.findOneBy({
      uid: uid
    })
  }

}
