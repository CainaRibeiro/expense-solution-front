import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { Solicications } from './solicitations.interface';

@Injectable({
  providedIn: 'root'
})
export class SolicitationsService {
  private readonly token: string = localStorage.getItem('token') || '';
    private readonly axiosInstance: AxiosInstance = axios.create({
      baseURL: 'https://localhost:7115/api/expense',
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });

  private readonly expenseType: Record<number, string> = {
    0: 'Reembolsável',
    1: 'Não Reembolsável',
  }

  constructor() { }

  async getAllPendingSolicitations() {
    const request = await this.axiosInstance.get('/pending');
    return request.data;
  }

  async updateSolicitationStatus(id: number, status: number) {
    return this.axiosInstance.put('/update', { id, status })
  }

  typeMapper(status: number) {
    return this.expenseType[status];
  }
}
