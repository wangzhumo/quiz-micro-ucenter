import { Injectable } from '@nestjs/common'
import { AccountService } from '../account/account.service'
import { PrismaService } from '../../database/prisma.service'
import { StatusCheck } from '../../common/status'
import { ErrorCode } from '../../common/errorcode'
import { AccountInfo } from '../interfaces/ucenter.interface'
import { TimeFormat } from '../../common/timeformat'

@Injectable()
export class AuthAccountService {
    constructor(
        private prisma: PrismaService,
        private readonly accountService: AccountService,
    ) {}

    async HasAuthAccount(params: any) {
        const { identityType, identity } = params
        const queryResult = await this.prisma.accountAuthInfo.findUnique({
            where: {
                identityType: identityType,
                identity: identity,
            },
        })
        if (queryResult) {
            return StatusCheck.Code(ErrorCode.EXIST_ACCOUNT, queryResult)
        }
        return StatusCheck.Code(ErrorCode.UN_EXIST_ACCOUNT, queryResult)
    }

    async auth(params: any) {
        const { identityType, identity, credential } = params
        const authRet = await this.prisma.accountAuthInfo.findUnique({
            where: {
                identityType: identityType,
                identity: identity,
                credential: credential,
            },
        })
        if (authRet) {
            return StatusCheck.Ok(authRet)
        }
        return StatusCheck.Error(authRet)
    }

    async AuthAccount(params: any) {
        const { nick, identityType, identity, credential } = params
        // check identityType range
        if (identityType <= 0 || identityType > 4) {
            return Promise.reject(ErrorCode.UN_SUPPORT_AUTH)
        }

        // check exist
        const auth = await this.HasAuthAccount({ identityType, identity })
        if (auth.code === ErrorCode.EXIST_ACCOUNT) {
            return StatusCheck.Code(ErrorCode.EXIST_ACCOUNT)
        }

        // create new base account
        const account = await this.accountService.CreateAccount(nick, null)

        // create authAccount token
        const newAuthInfo = await this.prisma.accountAuthInfo.create({
            data: {
                identityType: identityType,
                identity: identity,
                credential: credential,
                uid: account.uid,
                token: 'token address string : ' + account.uid,
            },
        })
        return StatusCheck.Ok({
            ...account,
            token: newAuthInfo.token,
            tokenExpire: TimeFormat.getSTime(newAuthInfo.tokenExpire),
            createdAt: TimeFormat.getSTime(account.createdAt),
            lastAt: TimeFormat.getSTime(account.lastAt),
        } as AccountInfo)
    }
}
