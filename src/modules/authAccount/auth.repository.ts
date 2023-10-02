import { AppDataSource } from '../../database/database';
import { AccountAuthInfo } from '../../database/entity/authAccount';

class AuthRepository {
  async authCheck(identityType: number, identity: string): Promise<AccountAuthInfo> {
    return AppDataSource.getRepository(AccountAuthInfo).findOneBy({
      identityType: identityType,
      identity: identity,
    });
  }

  async auth(identityType: number, identity: string,credential: string ) {

  }

  // create new authAccount account
  // check
  async createAccount(uid:string, identityType: number, identity: string,credential:string) {
    // check identityType range
    if (identityType <= 0 || identityType > 4) {
      return Promise.reject(ErrorCode.UN_SUPPORT_AUTH)
    }
    const authInfo = new AccountAuthInfo()
    authInfo.identityType = identityType
    authInfo.identity = identity
    authInfo.credential = credential
    authInfo.uid = uid
    // create authAccount token
    return AppDataSource.getRepository(AccountAuthInfo).save(authInfo)
  }
}

// export
export const authRepository = new AuthRepository();
