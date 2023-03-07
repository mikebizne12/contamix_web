import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {NgxLoginComponent} from './login/login.component';
import {AuthComponent} from './auth.component';
import {NbRegisterComponent} from "@nebular/auth";
import {NgxRegisterComponent} from "./register/register.component";

export const routes: Routes = [

  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: NgxLoginComponent,
      },
      {
        path: 'register',
        component: NgxRegisterComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgxAuthRoutingModule {
}
