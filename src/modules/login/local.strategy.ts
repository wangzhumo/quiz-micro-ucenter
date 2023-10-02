import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginService } from './login.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private loginService: LoginService) {
    super();
  }

  async validate(
    identityType: number,
    identity: string,
    credential: string,
  ) {
    const user = this.loginService.validateUser(
      identityType,
      identity,
      credential,
    );
    if (!user) {
      throw new UnauthorizedException(ErrorCode.Unauthorized);
    }
    return user;
  }
}
