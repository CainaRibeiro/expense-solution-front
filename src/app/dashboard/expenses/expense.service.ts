import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { RegisterExpense } from './expense.interface';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private readonly token: string = localStorage.getItem('token') || '';
  private readonly axiosInstance: AxiosInstance = axios.create({
    baseURL: 'https://localhost:7115/api/expense',
    headers: {
      Authorization: `Bearer ${this.token}`
    }
  });
  private readonly expenseStatus: Record<number, string> = {
    0: 'Pendente',
    1: 'Aprovado',
    2: 'Negado',
  }
  constructor() { }

  async registerExpense(expense: RegisterExpense) {
    const body = {
      userId: expense.userId,
      type: expense.type,
      value: expense.value,
      receipt: expense.receipt,
      description: expense.description,
    }
    return this.axiosInstance.post('/create', body);
  }
  async getAllExpenses() {
    return this.axiosInstance.get('/gettAll');
  }
  statusMapper(status: number) {
    return this.expenseStatus[status];
  }
}
