import { Request } from '@nestjs/common'

export const getReqMainInfo: (req: Request) => {
    [prop: string]: any
} = (req) => {
    const { headers, url, method, body } = req

    // 获取 IP
    const xRealIp = headers['X-Real-IP']
    const xForwardedFor = headers['X-Forwarded-For']
    const ip = xRealIp || xForwardedFor

    return {
        url,
        host: headers.get('host'),
        ip,
        method,
        body,
    }
}
