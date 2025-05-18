import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpensesComponent } from './dashboard/expenses/expenses.component';
import { ReportsComponent } from './dashboard/reports/reports.component';
import { SolicitationsComponent } from './dashboard/solicitations/solicitations.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'expenses/register', component: ExpensesComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'solicitations', component: SolicitationsComponent },
];
