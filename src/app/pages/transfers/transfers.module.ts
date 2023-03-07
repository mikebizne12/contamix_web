import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TransfersListComponent} from './transfers-list/transfers-list.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbContextMenuModule,
  NbIconModule, NbInputModule,
  NbSelectModule, NbSpinnerModule,
} from '@nebular/theme';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgxPaginationModule} from 'ngx-pagination';
import {OrderModule} from 'ngx-order-pipe';
import {ThemeModule} from '../../@theme/theme.module';
import {MbscModule} from '../../../assets/mobiscroll/js/mobiscroll.angular.min';
import { TransfersTotalsComponent } from './transfers-totals/transfers-totals.component';


const routes: Routes = [{
  path: '',
  component: TransfersListComponent,
}];


@NgModule({
  declarations: [TransfersListComponent, TransfersTotalsComponent],
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
    NgxPaginationModule,
    NbInputModule,
    OrderModule,
    ThemeModule,
    MbscModule,
  ],
})
export class TransfersModule {
}
