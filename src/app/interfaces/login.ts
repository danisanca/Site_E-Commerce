export interface LoginResponse {
    authenticated: boolean;
    created: string;
    expiration: string;
    acessToken: string;
    userName: string;
    shopId: number;
    message: string;
  }