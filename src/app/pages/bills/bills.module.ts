import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {BillsListComponent} from './bills-list/bills-list.component';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbContextMenuModule, NbDatepickerModule, NbDialogModule,
  NbIconModule, NbInputModule,
  NbSelectModule, NbSpinnerModule,
} from '@nebular/theme';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {BillsCrudComponent} from './bills-crud/bills-crud.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {NbMomentDateModule} from '@nebular/moment';
import {MbscModule} from '../../../assets/mobiscroll/js/mobiscroll.angular.min';

const routes: Routes = [{
  path: '',
  component: BillsListComponent,
}];

@NgModule({
  declarations: [BillsListComponent, BillsCrudComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NbCardModule,
    NbSelectModule,
    NbIconModule,
    NbActionsModule,
    FontAwesomeModule,
    NbButtonModule,
    NbInputModule,
    NbSpinnerModule,
    NbContextMenuModule,
    NbDialogModule.forChild(),
    NbDatepickerModule,
    MbscModule,
  ],
  entryComponents: [BillsCrudComponent]
})
export class BillsModule {
}
