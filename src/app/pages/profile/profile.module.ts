import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileDetailComponent} from './profile-detail/profile-detail.component';
import {RouterModule, Routes} from "@angular/router";
import {
  NbButtonModule,
  NbCardModule,
  NbContextMenuModule,
  NbIconModule, NbInputModule,
  NbSpinnerModule
} from "@nebular/theme";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ThemeModule} from "../../@theme/theme.module";
import {FormsModule, FormsModule as ngFormsModule, ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [{
  path: '',
  component: ProfileDetailComponent,
}];

@NgModule({
  declarations: [ProfileDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NbCardModule,
    NbIconModule,
    FontAwesomeModule,
    NbButtonModule,
    NbContextMenuModule,
    NbSpinnerModule,
    NbInputModule,
    ThemeModule
  ],
})
export class ProfileModule {
}
