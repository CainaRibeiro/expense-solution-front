import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private readonly token: string = localStorage.getItem('token') || '';
  private readonly axiosInstance: AxiosInstance = axios.create({
    baseURL: 'https://localhost:7115/api/reports',
    headers: {
      Authorization: `Bearer ${this.token}`
    }
  });
  constructor() { }

  async generateReport(startAt: Date, endAt: Date) {
    return this.axiosInstance.post('/create', {
      startAt,
      endAt
    });
  }

   async getAllReports() {
    return this.axiosInstance.get('/getAll');
  }
}
