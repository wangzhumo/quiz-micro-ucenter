import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AccountAuthInfo, AccountBaseInfo } from '../accounts';
import { authRepository } from './auth.repository';

@Injectable()
export class AuthAccountService {
  @MessagePattern({ cmd: 'auth_check' })
  async AuthCheck(identityType: number, identity: string) : Promise<AccountAuthInfo> {
    return authRepository.authCheck(identityType, identity);
  }

  @MessagePattern({ cmd: 'auth_account' })
  async AuthAccount(authInfo: AccountAuthInfo) {
    return authRepository.auth(authInfo.identityType,authInfo.identity,authInfo.credential)
  }
}
