import { Component } from '@angular/core';
import { ExpenseFormComponent } from './expense-form/expense-form.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';

@Component({
  selector: 'app-expenses',
  imports: [ExpenseFormComponent, ExpenseListComponent],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css'
})
export class ExpensesComponent {

}
