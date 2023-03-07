import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  NbActionsModule,
  NbLayoutModule,
  NbMenuModule,
  NbSearchModule,
  NbSidebarModule,
  NbUserModule,
  NbContextMenuModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbThemeModule,
  NbInputModule,
  NbDatepickerModule,
  NbCheckboxModule,
  NbCardModule, NbSpinnerModule, NbToggleModule,
} from '@nebular/theme';
import {NbMomentDateModule} from '@nebular/moment';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {NbSecurityModule} from '@nebular/security';
import {TranslateModule} from '@ngx-translate/core';

import {
  FooterComponent,
  HeaderComponent,
  SearchInputComponent,
  TinyMCEComponent,
} from './components';
import {
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
} from './pipes';
import {
  OneColumnLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,
} from './layouts';
import {DEFAULT_THEME} from './styles/theme.default';
import {COSMIC_THEME} from './styles/theme.cosmic';
import {CORPORATE_THEME} from './styles/theme.corporate';
import {DARK_THEME} from './styles/theme.dark';
import {ConfirmComponent} from './components/confirm/confirm.component';
import {ModalExpensesComponent} from './components/modal/modal-expenses/modal-expenses.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConfirmDeleteComponent} from './components/confirm-delete/confirm-delete.component';
import {ModalIncomesComponent} from './components/modal/modal-incomes/modal-incomes.component';
import {IconOrderComponent} from './components/icon-order/icon-order.component';
import {ModalTransfersComponent} from './components/modal/modal-transfers/modal-transfers.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';


const NB_MODULES = [
  FormsModule,
  ReactiveFormsModule,
  FontAwesomeModule,
  NbLayoutModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbContextMenuModule,
  NbSecurityModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbEvaIconsModule,
  NbCardModule,
  NbInputModule,
  NbDatepickerModule,
  NbSpinnerModule,
  NbToggleModule,
  NbCheckboxModule,
  NbMomentDateModule,
];
const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  SearchInputComponent,
  TinyMCEComponent,
  OneColumnLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,
  ConfirmComponent,
  ConfirmDeleteComponent,
  IconOrderComponent,
];
const ENTRYCOMPONENTS = [
  ConfirmComponent,
];
const PIPES = [
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
];

@NgModule({
  imports: [CommonModule, TranslateModule.forChild(), ...NB_MODULES],
  exports: [CommonModule, ...PIPES, ...COMPONENTS],
  declarations: [...COMPONENTS, ...PIPES, ModalExpensesComponent, ModalIncomesComponent, ModalTransfersComponent],
  entryComponents: [...ENTRYCOMPONENTS,
    ModalExpensesComponent, ModalIncomesComponent, ModalTransfersComponent, ConfirmDeleteComponent,
  ],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ThemeModule,
      providers: [
        ...NbThemeModule.forRoot(
          {
            name: 'default',
          },
          [DEFAULT_THEME, COSMIC_THEME, CORPORATE_THEME, DARK_THEME],
        ).providers,
      ],
    };
  }
}
