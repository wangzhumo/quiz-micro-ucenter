import { Module } from '@nestjs/common';
import { AuthAccountService } from './authAccount.service'
import { AccountService } from "../account/account.service";

@Module({
  providers: [AuthAccountService, AccountService],
  exports: [AuthAccountService],
})
export class AuthAccountModule {}