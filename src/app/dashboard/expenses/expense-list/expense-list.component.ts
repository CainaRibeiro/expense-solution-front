import { Component } from '@angular/core';
import { Expenses } from '../expense.interface';
import { ExpenseService } from '../expense.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent {
  public expenses: Expenses[] = [];

  constructor(private expenseService: ExpenseService) {}

  async getAll() {
    const response = await this.expenseService.getAllExpenses();
    return this.expenses = response.data;
  }

  expenseStatus(status: string) {
    return this.expenseService.statusMapper(Number(status));
  }

  formatDate(date:Date) {
    const sanitizedDate = new Date(date);
    const day = sanitizedDate.getDate().toString().padStart(2, '0');
    const month = (sanitizedDate.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = sanitizedDate.getFullYear();
    const hour = sanitizedDate.getHours().toString().padStart(2, '0');
    const minute = sanitizedDate.getMinutes().toString().padStart(2, '0');
    return `${day}/${month}/${year} ${hour}:${minute}`;
  }
  async ngOnInit() {
    await this.getAll()
  }
}
