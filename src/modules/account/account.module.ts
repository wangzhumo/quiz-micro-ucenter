import { Module } from '@nestjs/common'
import { AccountService } from './account.service'
import { AccountController } from './account.controller'
import { PrismaService } from '../../database/prisma.service'

@Module({
    controllers: [AccountController],
    providers: [AccountService, PrismaService],
    exports: [AccountService],
})
export class AccountModule {}
