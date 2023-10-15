import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common'
import { AccountService } from '../account/account.service'
import { PrismaService } from '../../database/prisma.service'
import { StatusCheck } from '../../common/status'
import { ErrorCode } from '../../common/errorcode'
import { AccountInfo } from '../interfaces/ucenter.interface'
import { TimeFormat } from '../../common/timeformat'
import { Long } from '@grpc/proto-loader'
import { IdentityType } from '../../database/identityType'
import * as argon from 'argon2'
import { idGenerator } from "../../database/idgenerator";

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

    async AuthAccount(params: any) {
        const { identityType, identity, credential } = params
        try {
            // check user
            const authRet = await this.prisma.accountAuthInfo.findUnique({
                where: {
                    identity: identity,
                },
            })
            if (authRet) {
                // verify credential
                let isCredentialValid = true
                if (authRet.identityType === IdentityType.EMAIL) {
                    isCredentialValid = await argon.verify(authRet.credential, credential)
                }
                if (!isCredentialValid) {
                    const authException = new UnauthorizedException('password verify error.')
                    return StatusCheck.Code(ErrorCode.Credential_Error, null, authException.message)
                }
                const userInfo = await this.prisma.accountBaseInfo.findUnique({
                    where: {
                        uid: authRet.uid,
                    },
                })
                const uidBigInt = BigInt(userInfo.uid).toString()
                return StatusCheck.Ok({
                    ...userInfo,
                    uid: Long.fromString(uidBigInt),
                    createdAt: TimeFormat.getSTime(userInfo.createdAt),
                    lastAt: TimeFormat.getSTime(userInfo.lastAt),
                    username: authRet.username,
                    avatarUrl: authRet.avatarUrl,
                    payload: authRet.payload,
                    identityType: authRet.identityType,
                    identity: authRet.identity,
                } as AccountInfo)
            } else {
                const authException = new ForbiddenException("Account hasn't exist.")
                return StatusCheck.Code(ErrorCode.UN_EXIST_ACCOUNT, null, authException.message)
            }
        } catch (error) {
            return StatusCheck.Code(ErrorCode.Login_Failure)
        }
    }

    async CreateAuthAccount(params: any) {
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
        const uidStrValue = idGenerator.nextId().toString()
        const account = await this.accountService.CreateAccount(nick, null, uidStrValue)
        // create authAccount token
        try {
            // argon2 encode password when use email & password
            let credentialEncode = credential
            if (identityType === IdentityType.EMAIL) {
                credentialEncode = await argon.hash(credentialEncode)
            }
            const newAuthInfo = await this.prisma.accountAuthInfo.create({
                data: {
                    identityType: identityType,
                    identity: identity,
                    credential: credentialEncode,
                    uid: account.uid,
                },
            })
            const uidBigInt = BigInt(newAuthInfo.uid).toString()
            return StatusCheck.Ok({
                ...account,
                uid: Long.fromString(uidBigInt),
                createdAt: TimeFormat.getSTime(account.createdAt),
                lastAt: TimeFormat.getSTime(account.lastAt),
                identityType: newAuthInfo.identityType,
                identity: newAuthInfo.identity,
                username: newAuthInfo.username,
                avatarUrl: newAuthInfo.avatarUrl,
                payload: newAuthInfo.payload,
            } as AccountInfo)
        } catch (error) {
            return StatusCheck.Code(ErrorCode.Create_Account_Error)
        }
    }
}
