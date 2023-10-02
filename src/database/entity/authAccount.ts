import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AccountAuthInfo {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  uid: string;
  @Column()
  identityType: number;
  @Column()
  identity: string;
  @Column()
  credential: string;
  @Column()
  tokenExpire: number;
  @Column()
  token: string
}