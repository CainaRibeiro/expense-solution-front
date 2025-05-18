import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Report } from '../report.interface';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-report-list',
  imports: [CommonModule],
  templateUrl: './report-list.component.html',
  styleUrl: './report-list.component.css'
})
export class ReportListComponent {
  public reports: Report[] = [];
  private readonly reportService: ReportService;

  constructor(reportService: ReportService) {
    this.reportService = reportService;
  }

  async getAllReports() {
    const request = await this.reportService.getAllReports();
    return this.reports = request.data;
  }

  async ngOnInit() {
    await this.getAllReports()
  }
}
