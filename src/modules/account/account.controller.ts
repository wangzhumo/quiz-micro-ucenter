import { Controller } from '@nestjs/common'
import { AccountService } from './account.service'
import { GrpcMethod } from '@nestjs/microservices'
import { CreateBaseAccountReq, CreateBaseAccountResp, GetAccountReq, GetAccountResp } from './account.interface'
import { StatusCheck } from '../../common/status'
import { ErrorCode } from '../../common/errorcode'
import { TimeFormat } from '../../common/timeformat'
import { Long } from '@grpc/proto-loader'

@Controller()
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    @GrpcMethod('UCenterService', 'CreateBaseAccount')
    async CreateBaseAccount(params: CreateBaseAccountReq): Promise<CreateBaseAccountResp> {
        const user = await this.accountService.CreateAccount(params.nick, null)
        const uidBigInt = BigInt(user.uid).toString()
        return {
            data: {
                uid: Long.fromString(uidBigInt),
                nick: user.nick,
                avatar: user.avatar,
                status: user.status,
                region: user.region,
                createdAt: TimeFormat.getSTime(user.createdAt),
                lastAt: TimeFormat.getSTime(user.lastAt),
            },
            code: ErrorCode.Ok,
            msg: undefined,
        }
    }

    @GrpcMethod('UCenterService', 'GetAccount')
    async GetAccount(params: GetAccountReq): Promise<GetAccountResp> {
        const uidBigInt = BigInt(params.uid.toString())
        const user = await this.accountService.findBaseAccount(uidBigInt)
        if (user) {
            return {
                data: {
                    uid: Long.fromString(uidBigInt.toString()),
                    nick: user.nick,
                    avatar: user.avatar,
                    status: user.status,
                    region: user.region,
                    createdAt: TimeFormat.getSTime(user.createdAt),
                    lastAt: TimeFormat.getSTime(user.lastAt),
                },
                code: ErrorCode.Ok,
                msg: undefined,
            }
        }
        return StatusCheck.Code(ErrorCode.UN_EXIST_ACCOUNT)
    }
}
