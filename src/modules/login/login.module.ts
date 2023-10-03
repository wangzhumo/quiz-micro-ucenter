import { Module } from '@nestjs/common';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthAccountModule } from '../authAccount/auth.module';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { AccountModule } from '../account/account.module';
import { AccountService } from '../account/account.service';

@Module({
  imports: [AuthAccountModule, PassportModule],
  controllers: [LoginController],
  providers: [LocalStrategy, LoginService],
  exports: [LoginService],
})
export class LoginModule {}
