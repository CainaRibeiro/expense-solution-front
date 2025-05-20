import { Component } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { Solicications } from './solicitations.interface';
import { CommonModule } from '@angular/common';
import { SolicitationsService } from './solicitations.service';
import { RefundServiceService } from '../../services/refunds/refund-service.service';

@Component({
  selector: 'app-solicitations',
  imports: [CommonModule],
  templateUrl: './solicitations.component.html',
  styleUrl: './solicitations.component.css',
})
export class SolicitationsComponent {
  public solicitations: Solicications[] = [];
  public refundSolicitations: Solicications[] = [];
  private readonly solicitationStatus: Record<string, number> = {
    APPROVE: 1,
    REJECT: 2,
  };

  constructor(
    private service: SolicitationsService,
    private refundService: RefundServiceService
  ) {}

  private reload() {
    return window.location.reload();
  }
  async getAllPendingSolicitations() {
    const request = await this.service.getAllPendingSolicitations();
    return (this.solicitations = request);
  }

  async getAllRefundSolicitations() {
    const response = await this.service.getAllRefundSolicitations();
    return (this.refundSolicitations = response);
  }

  solicitationType(type: number) {
    return this.service.typeMapper(type);
  }

  async approve(solicitation: Solicications) {
    await this.service.updateSolicitationStatus(
      solicitation.id,
      this.solicitationStatus['APPROVE']
    );
    return this.reload();
  }

  async reject(solicitation: Solicications) {
    await this.service.updateSolicitationStatus(
      solicitation.id,
      this.solicitationStatus['REJECT']
    );
    return this.reload();
  }

  async approveRefund(refund: Solicications) {
    await this.refundService.approveRefund(refund.id);
    return this.reload();
  }

  async rejectRefund(refund: Solicications) {
    await this.refundService.rejectRefund(refund.id);
    return this.reload();
  }
  ngOnInit() {
    this.getAllPendingSolicitations();
    this.getAllRefundSolicitations();
  }
}
