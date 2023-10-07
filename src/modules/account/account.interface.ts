import { AccountBaseInfo } from '../interfaces/ucenter.interface'
import { Long } from '@grpc/proto-loader'

export interface CreateBaseAccountReq {
    nick: string
    region: string
}

export interface CreateBaseAccountResp {
    code: number
    data: AccountBaseInfo
    msg: string
}

export interface GetAccountReq {
    uid: Long
}

export interface GetAccountResp {
    code: number
    data: AccountBaseInfo
    msg: string
}
