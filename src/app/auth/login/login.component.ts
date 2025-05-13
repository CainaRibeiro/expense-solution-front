import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  password: string = '';
  username: string = '';

  constructor(
    private service: AuthService,
    private router: Router,
  ) {}

  async login() {
    try {
      const response = await this.service.login(this.password, this.username);
      const decodedToken = await this.service.decodeToken(response);

      localStorage.setItem('token', response);
      localStorage.setItem('isLogged', 'true');
      localStorage.setItem('role', this.service.roleMapper(decodedToken.role));
      localStorage.setItem('userId', decodedToken.userId.toString());
      localStorage.setItem('username', decodedToken.username);
      this.resetForm();
      this.router.navigate(['/dashboard'])
    } catch (error) {
      localStorage.setItem('isLogged', 'false');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('userId');
    }
  }
  resetForm() {
    this.password = '';
    this.username = '';
  }
}
