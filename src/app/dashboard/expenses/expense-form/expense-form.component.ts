import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExpenseService } from '../expense.service';
import { RegisterExpense } from '../expense.interface';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-expense-form',
  imports: [FormsModule],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.css',
})
export class ExpenseFormComponent {
  public type: number = 0;
  public value: number = 0;
  public receipt: string = '';
  public description: string = '';

  private readonly expenseService: ExpenseService;
  constructor(ExpenseService: ExpenseService, private authService: AuthService) {
    this.expenseService = ExpenseService;
  }

  private reload() {
    return window.location.reload();
  }

  async createExpense() {
    try {
      const userId = Number(localStorage.getItem('userId'));
      if (!userId) throw new Error('User not found');
      const body: RegisterExpense = {
        userId: userId,
        description: this.description,
        receipt: this.receipt,
        type: Number(this.type),
        value: this.value,
      };
      await this.expenseService.registerExpense(body);
      return this.reload();
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  canSeeForm() {
    return !this.authService.isEmployee()
  }
}
