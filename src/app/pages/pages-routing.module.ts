import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ECommerceComponent} from './e-commerce/e-commerce.component';
import {NotFoundComponent} from './miscellaneous/not-found/not-found.component';


const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {
        path: 'iot-dashboard',
        component: ECommerceComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module')
          .then(m => m.ProfileModule),
      },
      {
        path: 'bills',
        loadChildren: () => import('./bills/bills.module')
          .then(m => m.BillsModule),
      },
      {
        path: 'incomes',
        loadChildren: () => import('./incomes/incomes.module')
          .then(m => m.IncomesModule),
      },
      {
        path: 'expenses',
        loadChildren: () => import('./expenses/expenses.module')
          .then(m => m.ExpensesModule),
      },
      {
        path: 'recurrences',
        loadChildren: () => import('./recurrences/recurrences.module')
          .then(m => m.RecurrencesModule),
      },
      {
        path: 'transfers',
        loadChildren: () => import('./transfers/transfers.module')
          .then(m => m.TransfersModule),
      },
      {
        path: 'types',
        loadChildren: () => import('./types/types.module')
          .then(m => m.TypesModule),
      }, /*
      {
        path: 'ui-features',
        loadChildren: () => import('./ui-features/ui-features.module')
          .then(m => m.UiFeaturesModule),
      },

      {
        path: 'modal-overlays',
        loadChildren: () => import('./modal-overlays/modal-overlays.module')
          .then(m => m.ModalOverlaysModule),
      },
        {
          path: 'layout',
          loadChildren: () => import('./layout/layout.module')
            .then(m => m.LayoutModule),
        },
        {
          path: 'forms',
          loadChildren: () => import('./forms/forms.module')
            .then(m => m.FormsModule),
        },

        {
          path: 'extra-components',
          loadChildren: () => import('./extra-components/extra-components.module')
            .then(m => m.ExtraComponentsModule),
        },
        {
          path: 'maps',
          loadChildren: () => import('./maps/maps.module')
            .then(m => m.MapsModule),
        },
        {
          path: 'charts',
          loadChildren: () => import('./charts/charts.module')
            .then(m => m.ChartsModule),
        },
        {
          path: 'editors',
          loadChildren: () => import('./editors/editors.module')
            .then(m => m.EditorsModule),
        },
        {
          path: 'tables',
          loadChildren: () => import('./tables/tables.module')
            .then(m => m.TablesModule),
        },
        {
          path: 'miscellaneous',
          loadChildren: () => import('./miscellaneous/miscellaneous.module')
            .then(m => m.MiscellaneousModule),
        },
        {
          path: '',
          redirectTo: 'dashboard',
          pathMatch: 'full',
        },*/
      {
        path: '**',
        component: NotFoundComponent,
      },
    ],
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
