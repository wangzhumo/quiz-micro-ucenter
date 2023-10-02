import { Entity } from "typeorm";

@Entity()
export class AccountAuthInfo {
  id: string;
  uid: string;
  identityType: number;
  identity: string;
  credential: string;
  tokenExpire: number;
  token: string
}