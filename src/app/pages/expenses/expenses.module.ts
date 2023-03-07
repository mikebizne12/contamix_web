import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExpensesListComponent} from './expenses-list/expenses-list.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {
  NbActionsModule,
  NbButtonModule, NbCalendarModule,
  NbCardModule,
  NbContextMenuModule,
  NbIconModule,
  NbSelectModule, NbSpinnerModule,
  NbDatepickerModule, NbInputModule,
} from '@nebular/theme';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgxPaginationModule} from 'ngx-pagination';
import {OrderModule} from 'ngx-order-pipe';
import {ThemeModule} from '../../@theme/theme.module';
import {ExpensesTotalsComponent} from './expenses-totals/expenses-totals.component';
import {NbMomentDateModule} from '@nebular/moment';
import {MbscModule} from '../../../assets/mobiscroll/js/mobiscroll.angular.min';

const routes: Routes = [{
  path: '',
  component: ExpensesListComponent,
}];

@NgModule({
  declarations: [ExpensesListComponent, ExpensesTotalsComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    NbCardModule,
    NbSelectModule,
    NbIconModule,
    NbActionsModule,
    FontAwesomeModule,
    NbButtonModule,
    NbContextMenuModule,
    NbSpinnerModule,
    NbInputModule,
    NgxPaginationModule,
    NbCalendarModule,
    NbMomentDateModule,
    OrderModule,
    NbDatepickerModule,
    ThemeModule,
    MbscModule,
  ],
  entryComponents: [],
})
export class ExpensesModule {
}
