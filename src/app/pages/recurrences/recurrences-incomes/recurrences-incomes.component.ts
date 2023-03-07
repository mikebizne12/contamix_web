import {Component, OnInit} from '@angular/core';
import {NotificacionesService} from '../../../@core/utils/notificaciones.service';
import {NbDialogService} from '@nebular/theme';
import {IncomesRecurrencesService} from '../../../@core/services/incomes-recurrences.service';

import * as moment from 'moment';
import {ConfirmDeleteComponent} from '../../../@theme/components/confirm-delete/confirm-delete.component';
import {RecurrencesCrudComponent} from '../recurrences-crud/recurrences-crud.component';

@Component({
  selector: 'ngx-recurrences-incomes',
  templateUrl: './recurrences-incomes.component.html',
  styleUrls: ['./recurrences-incomes.component.scss'],
})
export class RecurrencesIncomesComponent implements OnInit {
  data: any;
  loading = true;
  key: string = null;
  reverse: boolean = true;
  total = 0;
  obj = {
    tipo: 1,
    data: null,
  };

  constructor(public _incomesRecurrencesService: IncomesRecurrencesService,
              public _notificacionesService: NotificacionesService,
              private dialogService: NbDialogService) {
    this.data = [];
  }

  setOrder(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  getFormatDate(date) {
    return moment(date).format('ddd D MMM YYYY');
  }


  ngOnInit() {
    this.getElements();
  }

  getElements() {
    this.total = 0;
    this.loading = true;
    const params = {
      with: 'type,bill,recurrence',
    };
    this._incomesRecurrencesService.index(params).subscribe((resp: any) => {
      this.total += resp.reduce((total, objecto) => total += objecto.amount, 0);
      this.data = resp;
      this.loading = false;
    });
  }

  openCrud(obj) {
    this.obj.data = obj;
    const dialogRef = this.dialogService.open(RecurrencesCrudComponent, {
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
        this._incomesRecurrencesService.delete(id)
          .subscribe(() => {
            this._notificacionesService.eliminadoExitoso();
            this.getElements();
          });
      }
    });
  }

}
