import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AccountBaseInfo {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  uid: string
  @Column()
  avatar: string
  @Column()
  nick: string
  @Column()
  status: number
  @Column()
  region: string
  @Column()
  lastAt: number
  @Column()
  createAt: number
}

