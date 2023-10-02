import { Controller, UseGuards } from '@nestjs/common';
import { LoginService } from './login.service';
import { MessagePattern } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @UseGuards(AuthGuard('local'))
  @MessagePattern({ cmd: 'login_auth' })
  async LoginAuth(identityType: number, identity: string, credential: string) {
    const res = await this.loginService.validateUser(
      identityType,
      identity,
      credential,
    );
  }
}
