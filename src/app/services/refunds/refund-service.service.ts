import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { RefundStatus } from './refund.interface';

@Injectable({
  providedIn: 'root',
})
export class RefundServiceService {
  private readonly token: string = localStorage.getItem('token') || '';
  private readonly axiosInstance: AxiosInstance = axios.create({
    baseURL: 'https://localhost:7115/api/refund',
    headers: {
      Authorization: `Bearer ${this.token}`,
    },
  });

  private readonly refundStatus: Record<string, number> = {
    PENDING: 0,
    APPROVED: 1,
    REJECTED: 2,
  };
  constructor() {}

  private reload() {
    return window.location.reload();
  }

  async generateRefund(expenseId: number) {
    await this.axiosInstance.post('create', { expenseId });

    return this.reload();
  }

  async approveRefund(expenseId: number) {
    await this.axiosInstance.put('evaluate', {
      expenseId,
      status: this.refundStatus['APPROVED'],
    });

    return this.reload();
  }

  async rejectRefund(expenseId: number) {
    await this.axiosInstance.put('evaluate', {
      expenseId,
      status: this.refundStatus['REJECTED'],
    });
    return this.reload();
  }
}
