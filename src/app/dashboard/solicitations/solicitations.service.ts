import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { RefundServiceService } from '../../services/refunds/refund-service.service';

@Injectable({
  providedIn: 'root',
})
export class SolicitationsService {
  private readonly token: string = localStorage.getItem('token') || '';
  private readonly axiosInstance: AxiosInstance = axios.create({
    baseURL: 'https://localhost:7115/api/expense',
    headers: {
      Authorization: `Bearer ${this.token}`,
    },
  });

  private readonly expenseType: Record<number, string> = {
    0: 'Reembolsável',
    1: 'Não Reembolsável',
  };

  constructor(private refundService: RefundServiceService) {}

  async getAllPendingSolicitations() {
    const { data } = await this.axiosInstance.get('/pending');
    return data;
  }

  async getAllRefundSolicitations() {
    const { data } = await this.axiosInstance.get('pendingRefunding');

    return data;
  }

  async updateSolicitationStatus(id: number, status: number) {
    return this.axiosInstance.put('/update', { id, status });
  }

  typeMapper(status: number) {
    return this.expenseType[status];
  }
}
