import { Module } from '@nestjs/common';
import { AuthAccountService } from './authAccount.service'
import { AuthAccountController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountAuthInfo } from "../../database/entity/authAccount";

@Module({
  imports: [TypeOrmModule.forFeature([AccountAuthInfo])],
  controllers: [AuthAccountController],
  providers: [AuthAccountService],
  exports: [AuthAccountService]
})

export class AuthAccountModule {}