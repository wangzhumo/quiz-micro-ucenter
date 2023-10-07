import { Injectable } from '@nestjs/common'
import { idgenerator } from '../../database/idgenerator'
import { ColorAvatar } from '../../common/coloravatar'
import { PrismaService } from '../../database/prisma.service'

@Injectable()
export class AccountService {
    constructor(private readonly prisma: PrismaService) {}

    async CreateAccount(nick?: string, region?: string) {
        const uid = idgenerator.nextId()
        const uidNumber = Number(uid)
        const avatarCode = ColorAvatar.color(uid)
        const currentTime = new Date().toISOString()
        return this.prisma.accountBaseInfo.create({
            data: {
                uid: uidNumber,
                avatar: avatarCode,
                nick: nick,
                region: region ?? 'Global',
                createdAt: currentTime,
                lastAt: currentTime,
                status: 0,
            },
        })
    }

    async findBaseAccount(uid: number) {
        // Get one AccountBaseInfo
        return this.prisma.accountBaseInfo.findUnique({
            where: {
                uid: uid,
            },
        })
    }
}
