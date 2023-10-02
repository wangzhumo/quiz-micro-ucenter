import { Module } from '@nestjs/common';
import { AccountController } from './modules/account/account.controller';
import { AccountService } from './modules/account/account.service';
import { ConfigModule } from '@nestjs/config';
import { AuthAccountController } from './modules/authAccount/auth.controller';
import { AuthAccountService } from './modules/authAccount/authAccount.service';
import { LoginController } from './modules/login/login.controller';
import { LoginService } from './modules/login/login.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AccountController, AuthAccountController, LoginController],
  providers: [AccountService, AuthAccountService, LoginService],
})
export class AppModule {}
