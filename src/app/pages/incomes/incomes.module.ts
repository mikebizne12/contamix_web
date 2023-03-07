import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IncomesListComponent} from './incomes-list/incomes-list.component';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbContextMenuModule,
  NbIconModule, NbInputModule,
  NbSelectModule, NbSpinnerModule,
} from '@nebular/theme';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import {OrderModule} from 'ngx-order-pipe';
import {ThemeModule} from '../../@theme/theme.module';
import {IncomesTotalsComponent} from './incomes-totals/incomes-totals.component';
import {MbscModule} from '../../../assets/mobiscroll/js/mobiscroll.angular.min';

const routes: Routes = [{
  path: '',
  component: IncomesListComponent,
}];

@NgModule({
  declarations: [IncomesListComponent, IncomesTotalsComponent],
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
    NbInputModule,
    NbContextMenuModule,
    NbSpinnerModule,
    NgxPaginationModule,
    OrderModule,
    ThemeModule,
    MbscModule,
  ],
})
export class IncomesModule {
}
