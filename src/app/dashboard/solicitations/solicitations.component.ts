import { Component } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { Solicications } from './solicitations.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-solicitations',
  imports: [CommonModule],
  templateUrl: './solicitations.component.html',
  styleUrl: './solicitations.component.css'
})
export class SolicitationsComponent {
  private readonly token: string = localStorage.getItem('token') || '';
  private readonly axiosInstance: AxiosInstance = axios.create({
    baseURL: 'https://localhost:7115/api/expense',
    headers: {
      Authorization: `Bearer ${this.token}`
    }
  });

  public solicitations: Solicications[] = [];

  constructor() { }

  async getAllPendingSolicitations() {
    const request = await this.axiosInstance.get('/pending');
    return this.solicitations = request.data;
  }

  async approve(solicitation: Solicications) {

  }

  async reject(solicitation: Solicications) {

  }

  ngOnInit() {
    this.getAllPendingSolicitations();
  }
}
