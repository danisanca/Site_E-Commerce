export interface LoginResponse {
    isLogedIn: boolean;
    jwtToken:string
    refreshToken:string
  }
export interface JwtPayload{
  exp: number;
  sub: string;
  [key: string]: any;
}