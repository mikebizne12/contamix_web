import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TypesComponent} from './types.component';
import {TypesIncomesComponent} from './types-incomes/types-incomes.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  NbButtonModule,
  NbCardModule, NbDialogModule,
  NbIconModule,
  NbInputModule, NbListModule,
  NbSelectModule,
  NbSpinnerModule,
} from '@nebular/theme';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {OrderModule} from 'ngx-order-pipe';
import {ThemeModule} from '../../@theme/theme.module';
import {TypesCrudComponent} from './types-crud/types-crud.component';
import {TypesExpensesComponent} from './types-expenses/types-expenses.component';

const routes: Routes = [{
  path: '',
  component: TypesComponent,
}];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NbCardModule,
    NbIconModule,
    FontAwesomeModule,
    NbButtonModule,
    NbSpinnerModule,
    NbInputModule,
    OrderModule,
    ThemeModule,
    NbSelectModule,
    NbListModule,
    NbDialogModule.forChild(),
  ],
  declarations: [TypesComponent, TypesIncomesComponent, TypesCrudComponent, TypesExpensesComponent],
  entryComponents: [
    TypesCrudComponent,
  ],
})
export class TypesModule {
}
