import { Module } from '@nestjs/common';
import { AccountService } from "./account.service";
import { AccountController } from "./account.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountBaseInfo } from "../../database/entity/baseAccount";

@Module({
  imports: [TypeOrmModule.forFeature([AccountBaseInfo])],
  controllers: [AccountController],
  providers: [AccountService]
})
export class AccountModule {}