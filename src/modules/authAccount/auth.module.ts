import { Module } from '@nestjs/common'
import { AuthAccountService } from './authAccount.service'
import { AuthAccountController } from './auth.controller'
import { AccountModule } from '../account/account.module'
import { PrismaService } from '../../database/prisma.service'

@Module({
    imports: [AccountModule],
    controllers: [AuthAccountController],
    providers: [AuthAccountService, PrismaService],
    exports: [AuthAccountService],
})
export class AuthAccountModule {}
