import { Injectable } from '@nestjs/common';
import { AuthAccountService } from '../authAccount/authAccount.service';

@Injectable()
export class LoginService {
  constructor(private authService: AuthAccountService) {}

  async validateUser(
    identityType: number,
    identity: string,
    credential: string,
  ) {
    const user = await this.authService.AuthCheck(identityType, identity);
    if (user && user.credential === credential) {
      const { credential, ...result } = user;
      return result;
    }
    return null;
  }
}
