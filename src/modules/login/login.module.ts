import { Module } from '@nestjs/common';
import { AuthAccountService } from '../authAccount/authAccount.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthAccountModule } from '../authAccount/auth.module';
import { LoginService } from './login.service';

@Module({
  imports: [AuthAccountModule, PassportModule],
  providers: [AuthAccountService, LocalStrategy],
  exports: [LoginService],
})
export class LoginModule {}
