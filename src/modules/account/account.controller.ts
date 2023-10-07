import { Controller } from '@nestjs/common'
import { AccountService } from './account.service'
import { GrpcMethod } from '@nestjs/microservices'
import { CreateBaseAccountReq, CreateBaseAccountResp, GetAccountReq, GetAccountResp } from './account.interface'
import { StatusCheck } from '../../common/status'
import { ErrorCode } from '../../common/errorcode'
import { TimeFormat } from '../../common/timeformat'

@Controller()
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    @GrpcMethod('UCenterService', 'CreateBaseAccount')
    async CreateBaseAccount(params: CreateBaseAccountReq): Promise<CreateBaseAccountResp> {
        const user = await this.accountService.CreateAccount(params.nick, null)
        return {
            data: {
                uid: user.uid,
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
        const user = await this.accountService.findBaseAccount(params.uid.toNumber())
        if (user) {
            return {
                data: {
                    uid: user.uid,
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
