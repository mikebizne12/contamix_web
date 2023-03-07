import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  NbDialogService,
  NbMediaBreakpointsService,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
} from '@nebular/theme';

import {UserData} from '../../../@core/data/users';
import {LayoutService} from '../../../@core/utils';
import {map, take, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {NbTokenService} from '@nebular/auth';
import {Router} from '@angular/router';
import {ConfirmComponent} from '../confirm/confirm.component';
import {ModalesService} from '../../../@core/utils/modales.service';
import {CuentaUtilsService} from '../../../@core/utils/cuenta-utils.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  userMenu = [{title: 'Perfil', link: '/pages/profile'}, {title: 'Cerrar sesión', target: true}];
  tag = 'my-context-menu';

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private router: Router,
              private dialogService: NbDialogService,
              private userService: UserData,
              private layoutService: LayoutService,
              protected tokenService: NbTokenService,
              private _modalesService: ModalesService,
              private _cuentaUtilsService: CuentaUtilsService,
              private breakpointService: NbMediaBreakpointsService) {
    this.menuService.onItemClick()
      .subscribe((event) => {
        this.onContecxtItemSelection(event.item);
      });

  }

  onContecxtItemSelection(item) {

    if (item.target) {
      const dialogRef = this.dialogService.open(ConfirmComponent, {autoFocus: false});
      dialogRef.onClose.subscribe((resp) => {
        if (resp) {
          this.cerrarSesion();
        }
      });
    } else {
      this.router.navigateByUrl(item.link);
    }
  }

  cargarIngreo() {
    this._modalesService.abrirModalIngreso(null);
  }

  cargarGasto() {
    this._modalesService.abrirModalGasto(null);
  }

  cargarTransferencia() {
    this._modalesService.abrirModalTransferencia(null);
  }

  cerrarSesion() {
    this.tokenService.clear().subscribe((res) => {
      this.router.navigate(['auth/login']);
    });
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;
    this.user = this._cuentaUtilsService.obtenerSesion();
    // this.userService.getUsers()
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((users: any) => this.user = users.nick);

    const {xl} = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({name}) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
