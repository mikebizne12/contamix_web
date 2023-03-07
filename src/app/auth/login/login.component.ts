import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Injector} from '@angular/core';
import {NB_AUTH_OPTIONS, NbAuthResult, NbAuthService, NbAuthSocialLink, NbLoginComponent} from '@nebular/auth';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {CuentaUtilsService} from '../../@core/utils/cuenta-utils.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxLoginComponent extends NbLoginComponent {

  cargando = true;
  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;
  socialLinks: NbAuthSocialLink[] = [];
  rememberMe = false;

  private cuentaService: CuentaUtilsService;


  constructor(protected service: NbAuthService,
              private injector: Injector,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              protected cd: ChangeDetectorRef,
              protected router: Router) {
    super(
      service,
      options,
      cd,
      router,
    );
    this.service.isAuthenticated().subscribe((resp) => {
      if (resp) {
        this.cargando = false;
        this.router.navigate(['pages']);
      }
    });
    this.strategy = this.getConfigValue('forms.login.strategy');

  }

  login(): void {
    this.cuentaService = this.injector.get(CuentaUtilsService);
    this.errors = [];
    this.messages = [];
    this.submitted = true;
    this.service.authenticate(this.strategy, this.user).subscribe((result: NbAuthResult) => {
      const response = result.getResponse().body;
      this.submitted = false;
      if (result.isSuccess()) {
        const data = {
          'id': response.id,
          'name': response.name,
          'username': response.username,
          'email': response.email,
          'api_token': response.api_token,
        };
        this.cuentaService.setearCredenciales(data);
        this.messages = result.getMessages();
        // this.showMessages.success = result.getMessages();
      } else {
        this.showMessages.error = result.getErrors();
        this.errors = result.getErrors();
      }

      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
      this.cd.detectChanges();
    });
  }
}
