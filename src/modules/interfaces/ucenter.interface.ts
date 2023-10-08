import { Long } from '@grpc/proto-loader'

export interface AccountAuthInfo {
    uid: Long
    identityType: number
    identity: string
    username?: string
    payload?: string
    avatarUrl?: string
}

export interface AccountBaseInfo {
    uid: Long
    avatar: string
    nick: string
    status: number
    region: string
    lastAt: number
    createdAt: number
}

export interface AccountInfo {
    uid: Long
    avatar: string
    nick: string
    status: number
    region: string
    lastAt: number
    createdAt: number
    identityType: number
    identity: string
    username?: string
    payload?: string
    avatarUrl?: string
}
