import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {NgxAuthRoutingModule} from './auth-routing.module';
import {NbAuthModule, NbRegisterComponent} from '@nebular/auth';
import {
  NbAlertModule,
  NbButtonModule, NbCardModule,
  NbCheckboxModule, NbIconModule,
  NbInputModule, NbLayoutModule, NbSpinnerModule
} from '@nebular/theme';

import {NgxLoginComponent} from './login/login.component';
import {AuthComponent} from './auth.component';
import {NgxRegisterComponent} from './register/register.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NgxAuthRoutingModule,
    NbCardModule,
    NbLayoutModule,
    NbAuthModule,
    NbIconModule,
    NbSpinnerModule,
  ],
  declarations: [
    // ... here goes our new components
    AuthComponent,
    NgxLoginComponent,
    NgxRegisterComponent,
  ],
})
export class NgxAuthModule {
}
