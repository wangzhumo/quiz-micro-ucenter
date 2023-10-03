import { Injectable } from '@nestjs/common'
import { AuthAccountService } from '../authAccount/authAccount.service'
import { StatusCheck } from "../../common/status";
import { ErrorCode } from "../../common/errorcode";

@Injectable()
export class LoginService {
    constructor(private authService: AuthAccountService) {}

    async validateUser(identityType: number, identity: string, credential: string) {
        const user = await this.authService.AuthCheck({identityType, identity})
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
        const user = await this.authService.AuthCheck({identityType, identity})
        console.log('registerAccount 1', user)
        // save to database
        if (user) {
            // already exist
            console.log('registerAccount 2', user)
            return Promise.reject(ErrorCode.EXIST_ACCOUNT)
        } else {
            // save to database
            const authRet = await this.authService.AuthAccount({
                nick,
                identityType,
                identity,
                credential,
            })
            console.log('registerAccount 3', authRet)
            return authRet
        }
    }
}
