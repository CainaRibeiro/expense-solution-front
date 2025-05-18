import { Component } from '@angular/core';
import { ReportListComponent } from './report-list/report-list.component';
import { ReportFormComponent } from './report-form/report-form.component';

@Component({
  selector: 'app-reports',
  imports: [ReportFormComponent, ReportListComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {

}
