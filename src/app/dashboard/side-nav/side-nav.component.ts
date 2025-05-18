import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-side-nav',
  imports: [CommonModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent {
  public readonly authService: AuthService;
  private readonly router: Router;
  constructor(AuthService: AuthService, Router: Router) {
    this.authService = AuthService;
    this.router = Router;
  }
  canSeeOptions() {
    const isLogged = localStorage.getItem('isLogged');
    const hasToken = localStorage.getItem('token');

    return Boolean(isLogged) && hasToken;
  }
  getUsername() {
    return localStorage.getItem('username');
  }
  navigateToRegisterExpense() {
    return this.router.navigate(['expenses/register'])
  }
  navigateToReports() {
    return this.router.navigate(['reports'])
  }
}
