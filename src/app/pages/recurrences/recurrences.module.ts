import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecurrencesComponent} from './recurrences.component';
import {RecurrencesIncomesComponent} from './recurrences-incomes/recurrences-incomes.component';
import {RecurrencesExpensesComponent} from './recurrences-expenses/recurrences-expenses.component';
import {RecurrencesRoutingModule} from './recurrences-routing.module';
import {ThemeModule} from '../../@theme/theme.module';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule, NbCheckboxModule,
  NbContextMenuModule, NbDatepickerModule, NbDialogModule,
  NbIconModule, NbInputModule,
  NbSelectModule, NbSpinnerModule,
} from '@nebular/theme';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgxPaginationModule} from 'ngx-pagination';
import {OrderModule} from 'ngx-order-pipe';
import {RecurrencesCrudComponent} from './recurrences-crud/recurrences-crud.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NbMomentDateModule} from '@nebular/moment';
import {RecurrencesIncomesTotalComponent} from './recurrences-incomes/recurrences-incomes-total/recurrences-incomes-total.component';
import {RecurrencesExpensesTotalComponent} from './recurrences-expenses/recurrences-expenses-total/recurrences-expenses-total.component';


@NgModule({
  declarations: [
    RecurrencesComponent,
    RecurrencesIncomesComponent,
    RecurrencesIncomesTotalComponent,
    RecurrencesExpensesComponent,
    RecurrencesExpensesTotalComponent,
    RecurrencesCrudComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbCheckboxModule,
    ThemeModule,
    NbCardModule,
    NbSelectModule,
    NbIconModule,
    NbActionsModule,
    FontAwesomeModule,
    NbButtonModule,
    NbContextMenuModule,
    NbSpinnerModule,
    NgxPaginationModule,
    OrderModule,
    RecurrencesRoutingModule,
    NbDatepickerModule,
    NbMomentDateModule,
    NbDialogModule.forChild(),
    NbInputModule,
  ],
  entryComponents: [
    RecurrencesCrudComponent,
    RecurrencesIncomesTotalComponent,
    RecurrencesExpensesTotalComponent,
  ],
})
export class RecurrencesModule {
}
