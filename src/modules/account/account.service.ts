import { Injectable } from '@nestjs/common'
import { idGenerator } from '../../database/idgenerator'
import { ColorAvatar } from '../../common/coloravatar'
import { PrismaService } from '../../database/prisma.service'

@Injectable()
export class AccountService {
    constructor(private readonly prisma: PrismaService) {}

    async CreateAccount(nick?: string, region?: string) {
        const uid = idGenerator.nextId()
        const avatarCode = ColorAvatar.color(String(uid))
        const currentTime = new Date().toISOString()
        return this.prisma.accountBaseInfo.create({
            data: {
                uid: uid,
                avatar: avatarCode,
                nick: nick,
                region: region ?? 'Global',
                createdAt: currentTime,
                lastAt: currentTime,
                status: 0,
            },
        })
    }

    async findBaseAccount(uid: bigint) {
        // Get one AccountBaseInfo
        return this.prisma.accountBaseInfo.findUnique({
            where: {
                uid: uid,
            },
        })
    }
}
