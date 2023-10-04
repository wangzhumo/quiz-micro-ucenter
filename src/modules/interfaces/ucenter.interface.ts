export interface AccountAuthInfo {
    uid: number
    token: string
    tokenExpire: number
}

export interface AccountBaseInfo {
    uid: number
    avatar: string
    nick: string
    status: number
    region: string
    lastAt: number
    createdAt: number
}

export interface AccountInfo {
    uid: number
    avatar: string
    nick: string
    status: number
    region: string
    lastAt: number
    createdAt: number
    token: string
    tokenExpire: number
}
