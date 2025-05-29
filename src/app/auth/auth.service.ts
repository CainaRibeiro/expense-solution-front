import { Injectable } from '@angular/core';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from './auth.interface';
import { Router } from '@angular/router'

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
  private readonly router: Router;
  constructor(Router: Router) {
    this.router = Router;
  }

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
  canRegisterExpense() {
    const role = localStorage.getItem('role');
    if (!role) return false;
    return this.roles[0] === role || this.roles[1] === role || this.roles[2] === role;
  }
  canGetReport() {
    const role = localStorage.getItem('role');
    if (!role) return false;
    return this.roles[0] === role || this.roles[1] === role;
  }
  canSeeRequests() {
    const role = localStorage.getItem('role');
    if (!role) return false;
    return this.roles[0] === role || this.roles[1] == role;
  }
  canRequestRefund() {
    const role = localStorage.getItem('role');
    if (!role) return false;
    return this.roles[2] == role;
  }
  isEmployee() {
    const role = localStorage.getItem('role');
    return this.roles[2] === role;
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.setItem('isLogged', 'false');
    this.router.navigate(['/']);
  }
}
