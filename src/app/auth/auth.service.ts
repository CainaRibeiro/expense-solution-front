import { Injectable } from '@angular/core';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from './auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl: string = 'https://localhost:7115/api';
  private readonly roles: Record<number, string> = {
    0: 'Administrator',
    1: 'Manager',
    2: 'Employee',
  }

  constructor() { }

  async login(password: string, username: string) {
    const body = { username, password }
    const request = await axios.post(`${this.baseUrl}/user/login`, body)
    return request.data;
  }
  async decodeToken(token: string) {
    return jwtDecode<JwtPayload>(token);
  }
  roleMapper(role: number) {
    return this.roles[role];
  }
}
