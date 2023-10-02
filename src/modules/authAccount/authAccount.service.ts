import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountAuthInfo } from '../../database/entity/authAccount';

@Injectable()
export class AuthAccountService {
  constructor(
    @InjectRepository(AccountAuthInfo)
    private readonly authRepository: Repository<AccountAuthInfo>,
  ) {}

  @MessagePattern({ cmd: 'auth_check' })
  async AuthCheck(
    identityType: number,
    identity: string,
  ): Promise<AccountAuthInfo> {
    return this.authRepository.findOneBy({
      identityType: identityType,
      identity: identity,
    });
  }

  @MessagePattern({ cmd: 'auth' })
  async auth(identityType: number, identity: string,credential: string ) {
    return this.authRepository.findOneBy({
      identityType: identityType,
      identity: identity,
      credential: credential
    });
  }

  @MessagePattern({ cmd: 'auth_account' })
  async AuthAccount(authInfo: AccountAuthInfo) {
    // check identityType range
    if (authInfo.identityType <= 0 || authInfo.identityType > 4) {
      return Promise.reject(ErrorCode.UN_SUPPORT_AUTH);
    }
    const dbAuthInfo = new AccountAuthInfo();
    dbAuthInfo.identityType = authInfo.identityType;
    dbAuthInfo.identity = authInfo.identity;
    dbAuthInfo.credential = authInfo.credential;
    dbAuthInfo.uid = authInfo.uid;

    // create authAccount token
    return this.authRepository.save(authInfo);
  }
}
