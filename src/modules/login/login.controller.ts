import { Controller, Get } from '@nestjs/common';
import { LoginService } from './login.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @MessagePattern({ cmd: 'login_auth' })
  async LoginAuth(params: any) {
    const { identityType, identity, credential } = params
    const res = await this.loginService.validateUser(
      identityType,
      identity,
      credential,
    );
  }

  /**
   * register new account
   * @constructor
   * @param params
   */
  @MessagePattern({ cmd: 'register' })
  async Register(
    params: any
  ) {
    const { nick,identityType,identity,credential } = params
    return await this.loginService.registerAccount(
      nick,
      identityType,
      identity,
      credential,
    );
  }
}
