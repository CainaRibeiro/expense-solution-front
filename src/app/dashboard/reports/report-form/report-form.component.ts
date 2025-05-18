import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-report-form',
  imports: [FormsModule],
  templateUrl: './report-form.component.html',
  styleUrl: './report-form.component.css'
})
export class ReportFormComponent {
  public startAt!: Date;
  public endAt!: Date;

  private readonly reportService: ReportService;
  constructor(reportService: ReportService) {
    this.reportService = reportService;
  }

  async generateReport() {
    return this.reportService.generateReport(this.startAt, this.endAt);
  }
}
