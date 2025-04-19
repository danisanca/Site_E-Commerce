export interface AuthResponse {
  authenticated: boolean;
  created: string;
  expiration: string;
  acessToken: string;
  message: string;
}