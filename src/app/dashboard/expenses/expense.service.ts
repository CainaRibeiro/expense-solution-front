import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { RegisterExpense } from './expense.interface';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private readonly token: string = localStorage.getItem('token') || '';
  private readonly axiosInstance: AxiosInstance = axios.create({
    baseURL: 'https://localhost:7115/api/expense',
    headers: {
      Authorization: `Bearer ${this.token}`,
    },
  });
  private readonly expenseStatus: Record<number, string> = {
    0: 'Pendente',
    1: 'Aprovado',
    2: 'Negado',
    3: 'Reembolsado',
    4: 'Reembolso pendente',
    5: 'Reembolso negado',
  };

  private readonly expenseType: Record<number, string> = {
    0: 'Reembolsável',
    1: 'Não Reembolsável',
  };
  constructor() {}

  async registerExpense(expense: RegisterExpense) {
    const body = {
      userId: expense.userId,
      type: expense.type,
      value: expense.value,
      receipt: expense.receipt,
      description: expense.description,
    };
    await this.axiosInstance.post('/create', body);
    return alert('Despesa enviada para avaliação');
  }
  async getAllExpenses() {
    return this.axiosInstance.get('/notPending');
  }
  statusMapper(status: number) {
    return this.expenseStatus[status];
  }
  typeMapper(status: number) {
    return this.expenseType[status];
  }
}
