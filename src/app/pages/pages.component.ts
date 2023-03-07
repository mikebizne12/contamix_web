import {Component} from '@angular/core';

import {MENU_ITEMS} from './pages-menu';

import {fas} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeModule, FaIconLibrary} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS;

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

}
