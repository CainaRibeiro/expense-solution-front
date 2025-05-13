import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExpenseService } from '../expense.service';
import { RegisterExpense } from '../expense.interface';

@Component({
  selector: 'app-expense-form',
  imports: [FormsModule],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.css'
})
export class ExpenseFormComponent {
  public type: string = '';
  public value: number = 0;
  public receipt: string = '';
  public description: string = '';

  private readonly expenseService: ExpenseService;
  constructor(ExpenseService: ExpenseService) {
    this.expenseService = ExpenseService;
  }

  async createExpense() {
    try {
      const userId = Number(localStorage.getItem('userId'));
      if (!userId) throw new Error('User not found');
      const body: RegisterExpense = {
        userId: userId,
        description: this.description,
        receipt: this.receipt,
        type: this.type,
        value: this.value
      }
      await this.expenseService.registerExpense(body);
      window.location.reload();
      return;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
