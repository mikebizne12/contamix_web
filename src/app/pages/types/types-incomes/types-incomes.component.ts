import {Component, Input, OnInit} from '@angular/core';
import {IncomesTypesService} from '../../../@core/services/incomes-types.service';
import {NbDialogService} from '@nebular/theme';
import {TypesCrudComponent} from '../types-crud/types-crud.component';
import {ConfirmDeleteComponent} from '../../../@theme/components/confirm-delete/confirm-delete.component';
import {NotificacionesService} from '../../../@core/utils/notificaciones.service';
import {IconsService} from '../../../@core/services/icons.service';
import {forkJoin, Observable} from 'rxjs';

@Component({
  selector: 'ngx-types-incomes',
  templateUrl: './types-incomes.component.html',
  styleUrls: ['./types-incomes.component.scss'],
})
export class TypesIncomesComponent implements OnInit {
  data: any;
  loading = true;
  key: string = null;
  reverse: boolean = true;
  obj = {
    tipo: 1,
    data: null,
    iconos: null,
  };

  constructor(public _incomesTypesService: IncomesTypesService,
              public _iconsService: IconsService,
              public _notificacionesService: NotificacionesService,
              private dialogService: NbDialogService) {
    this.data = [];
  }

  setOrder(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  private _requestMultiple(): Observable<any[]> {
    const resp1 = this._iconsService.index();
    const resp2 = this._incomesTypesService.index();
    return forkJoin([resp1, resp2]);
  }


  ngOnInit() {
    this.getElements();
  }

  getElements() {
    this.loading = true;
    this._requestMultiple().subscribe((resp: any) => {
      this.obj.iconos = resp[0];
      this.data = resp[1];
      this.loading = false;
    });
  }

  openCrud(obj) {
    this.obj.data = obj;
    const dialogRef = this.dialogService.open(TypesCrudComponent, {
      context: this.obj,
    });
    dialogRef.onClose.subscribe((resp) => {
      if (resp) {
        this.getElements();
      }
    });
  }

  deleteE(id) {
    const dialogRef = this.dialogService.open(ConfirmDeleteComponent, {autoFocus: false});
    dialogRef.onClose.subscribe((resp) => {
      if (resp) {
        this.loading = true;
        this._incomesTypesService.delete(id)
          .subscribe(() => {
            this._notificacionesService.eliminadoExitoso();
            this.getElements();
          });
      }
    });
  }

}
