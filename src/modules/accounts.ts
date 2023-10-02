interface AccountBaseInfo {
  id: string;
  uid: string;
  avatar: string;
  nickname: string;
  status: number;
  region: string;
  lastLogin: number;
  createAt: number;
}

interface AccountAuthInfo {
  id: string;
  uid: string;
  identityType: number;
  identity: string;
  credential: string;
  tokenExpire: number;
  token: string
}

export { AccountBaseInfo , AccountAuthInfo}