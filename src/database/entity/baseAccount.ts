import { Column, Entity } from "typeorm";

@Entity()
export class AccountBaseInfo {
  id: number
  uid: string
  avatar: string
  nick: string
  status: number
  region: string
  lastAt: number
  createAt: number
}

