import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RecurrencesComponent} from './recurrences.component';
import {RecurrencesIncomesComponent} from './recurrences-incomes/recurrences-incomes.component';
import {RecurrencesExpensesComponent} from './recurrences-expenses/recurrences-expenses.component';

const routes: Routes = [{
  path: '',
  component: RecurrencesComponent,
  children: [{
    path: 'incomes',
    component: RecurrencesIncomesComponent,
  }, {
    path: 'expenses',
    component: RecurrencesExpensesComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecurrencesRoutingModule {
}
