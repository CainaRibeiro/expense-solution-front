export interface JwtPayload {
  sub: string;
  exp: number;
  role: number;
  userId: number;
  username: string;
}
