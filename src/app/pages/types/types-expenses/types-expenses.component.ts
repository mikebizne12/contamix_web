import {Component, Input, OnInit} from '@angular/core';
import {NotificacionesService} from '../../../@core/utils/notificaciones.service';
import {NbDialogService} from '@nebular/theme';
import {TypesCrudComponent} from '../types-crud/types-crud.component';
import {ConfirmDeleteComponent} from '../../../@theme/components/confirm-delete/confirm-delete.component';
import {ExpensesTypesService} from '../../../@core/services/expenses-types.service';
import {forkJoin, Observable} from 'rxjs';
import {IconsService} from '../../../@core/services/icons.service';

@Component({
  selector: 'ngx-types-expenses',
  templateUrl: './types-expenses.component.html',
  styleUrls: ['./types-expenses.component.scss'],
})
export class TypesExpensesComponent implements OnInit {
  data: any;
  loading = true;
  key: string = null;
  reverse: boolean = true;
  obj = {
    tipo: 0,
    data: null,
    iconos: null,
  };


  constructor(public _expensesTypesService: ExpensesTypesService,
              public _notificacionesService: NotificacionesService,
              public _iconsService: IconsService,
              private dialogService: NbDialogService) {
    this.data = [];
  }

  setOrder(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  ngOnInit() {
    this.getElements();
  }

  private _requestMultiple(): Observable<any[]> {
    const resp1 = this._iconsService.index();
    const resp2 = this._expensesTypesService.index();
    return forkJoin([resp1, resp2]);
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
        this._expensesTypesService.delete(id)
          .subscribe(() => {
            this._notificacionesService.eliminadoExitoso();
            this.getElements();
          });
      }
    });
  }

}
