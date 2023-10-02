import { AppDataSource } from '../../database/database';
import { generator } from '../../database/idgenerator';
import { AccountBaseInfo } from '../../database/entity/baseAccount';

class AccountRepository {
  async findAccount(uid: string) {
    return AppDataSource.getRepository(AccountBaseInfo).findOneBy({ uid: uid });
  }

  async insertBaseAccount(nick?: string, avatar?: string, region?: string) {
    // create uid
    // get current time
    // nick
    // status 0
    const account = new AccountBaseInfo();
    account.status = 0;
    account.avatar = avatar;
    account.nick = nick;
    account.region = region;
    account.createAt = Date.now();
    account.uid = generator.nextId();
    account.lastAt = account.createAt;

    // save to account base info database
    return AppDataSource.manager.save(account);
  }
}

// export
export const accountRepository = new AccountRepository();

