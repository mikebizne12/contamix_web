import {Component} from '@angular/core';
import {NbAuthComponent} from '@nebular/auth';

@Component({
  selector: 'auth',
  styleUrls: ['./auth.component.scss'],
  template: `
    <nb-layout>
      <nb-layout-column>
        <nb-auth-block>
          <router-outlet></router-outlet>
        </nb-auth-block>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class AuthComponent extends NbAuthComponent {
}
