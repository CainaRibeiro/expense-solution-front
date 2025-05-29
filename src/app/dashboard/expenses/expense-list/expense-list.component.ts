import { Component } from '@angular/core';
import { Expenses } from '../expense.interface';
import { ExpenseService } from '../expense.service';
import { CommonModule } from '@angular/common';
import { RefundServiceService } from '../../../services/refunds/refund-service.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css'],
})
export class ExpenseListComponent {
  public expenses: Expenses[] = [];

  constructor(
    private expenseService: ExpenseService,
    private refundService: RefundServiceService,
    private authService: AuthService
  ) {}

  async getAll() {
    const response = await this.expenseService.getAllExpenses();
    return (this.expenses = response.data);
  }

  expenseStatus(status: number) {
    return this.expenseService.statusMapper(status);
  }

  expenseType(status: number) {
    return this.expenseService.typeMapper(status);
  }

  hasRefundableExpenses(): boolean {
    return this.expenses.some((e) => e.type === 0);
  }

  isRefundable(expense: Expenses) {
    return expense.type === 0 && expense.status !== 3 && expense.status !== 2;
  }
  formatDate(date: Date) {
    const sanitizedDate = new Date(date);
    const day = sanitizedDate.getDate().toString().padStart(2, '0');
    const month = (sanitizedDate.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = sanitizedDate.getFullYear();
    const hour = sanitizedDate.getHours().toString().padStart(2, '0');
    const minute = sanitizedDate.getMinutes().toString().padStart(2, '0');
    return `${day}/${month}/${year} ${hour}:${minute}`;
  }

  async requestRefund(expense: Expenses) {
    return this.refundService.generateRefund(expense.id);
  }
  canSeeRefundButton() {
    return this.authService.isEmployee()
  }
  async ngOnInit() {
    await this.getAll();
  }
}
