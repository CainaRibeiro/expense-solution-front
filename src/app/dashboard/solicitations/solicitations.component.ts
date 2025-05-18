import { Component } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { Solicications } from './solicitations.interface';
import { CommonModule } from '@angular/common';
import { SolicitationsService } from './solicitations.service';

@Component({
  selector: 'app-solicitations',
  imports: [CommonModule],
  templateUrl: './solicitations.component.html',
  styleUrl: './solicitations.component.css'
})
export class SolicitationsComponent {
  public solicitations: Solicications[] = [];
  private readonly solicitationStatus: Record<string, number> = {
    APPROVE: 1,
    REJECT: 2,
  }

  constructor(private service: SolicitationsService) {}

  async getAllPendingSolicitations() {
    const request = await this.service.getAllPendingSolicitations();
    return this.solicitations = request;
  }

  solicitationType(type: number) {
    return this.service.typeMapper(type);
  }

  async approve(solicitation: Solicications) {
    await this.service.updateSolicitationStatus(solicitation.id, this.solicitationStatus['APPROVE'])
    window.location.reload();
    return;
  }

  async reject(solicitation: Solicications) {
    await this.service.updateSolicitationStatus(solicitation.id, this.solicitationStatus['REJECT'])
    window.location.reload();
    return;
  }

  ngOnInit() {
    this.getAllPendingSolicitations();
  }
}
