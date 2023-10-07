import { Injectable } from '@nestjs/common'
import { AuthAccountService } from '../authAccount/authAccount.service'
import { StatusCheck } from '../../common/status'
import { ErrorCode } from '../../common/errorcode'

@Injectable()
export class LoginService {
    constructor(private authService: AuthAccountService) {}

    async validateUser(identityType: number, identity: string, credential: string) {
        const user = await this.authService.HasAuthAccount({ identityType, identity })
        if (user.code !== ErrorCode.Ok) {
            return StatusCheck.Code(user.code)
        }
        if (user && user.data.credential === credential) {
            const { credential, ...result } = user.data
            return result
        }
        return StatusCheck.Error(user.data)
    }

    async registerAccount(nick: string, identityType: number, identity: string, credential: string) {
        // check account exist
        const ret = await this.authService.HasAuthAccount({ identityType, identity }) // save to database
        if (ret.code === ErrorCode.EXIST_ACCOUNT) {
            // already exist
            return StatusCheck.Code(ErrorCode.EXIST_ACCOUNT)
        } else if (ret.code === ErrorCode.UN_EXIST_ACCOUNT) {
            // save to database
            return await this.authService.AuthAccount({
                nick,
                identityType,
                identity,
                credential,
            })
        } else {
            return StatusCheck.Code(ErrorCode.Failure)
        }
    }
}
