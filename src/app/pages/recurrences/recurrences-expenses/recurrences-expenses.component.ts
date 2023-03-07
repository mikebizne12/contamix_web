import {Component, OnInit} from '@angular/core';
import {NotificacionesService} from '../../../@core/utils/notificaciones.service';
import {NbDialogService} from '@nebular/theme';
import {ExpensesRecurrencesService} from '../../../@core/services/expenses-recurrences.service';
import {ConfirmDeleteComponent} from '../../../@theme/components/confirm-delete/confirm-delete.component';

import * as moment from 'moment';
import {RecurrencesCrudComponent} from '../recurrences-crud/recurrences-crud.component';

@Component({
  selector: 'ngx-recurrences-expenses',
  templateUrl: './recurrences-expenses.component.html',
  styleUrls: ['./recurrences-expenses.component.scss'],
})
export class RecurrencesExpensesComponent implements OnInit {
  data: any;
  loading = true;
  key: string = null;
  reverse: boolean = true;
  total = 0;
  obj = {
    tipo: 0,
    data: null,
  };

  constructor(public _expensesRecurrencesService: ExpensesRecurrencesService,
              public _notificacionesService: NotificacionesService,
              private dialogService: NbDialogService) {
  }

  setOrder(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  getFormatDate(date) {
    return moment(date).format('ddd D MMM YYYY');
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

  ngOnInit() {
    this.getElements();
  }

  getElements() {
    this.total = 0;
    this.loading = true;
    const params = {
      with: 'type,bill,recurrence',
    };
    this._expensesRecurrencesService.index(params).subscribe((resp: any) => {
      this.total += resp.reduce((total, objecto) => total += objecto.amount, 0);
      this.data = resp;
      this.loading = false;
    });
  }

  deleteE(id) {
    const dialogRef = this.dialogService.open(ConfirmDeleteComponent, {autoFocus: false});
    dialogRef.onClose.subscribe((resp) => {
      if (resp) {
        this.loading = true;
        this._expensesRecurrencesService.delete(id)
          .subscribe(() => {
            this._notificacionesService.eliminadoExitoso();
            this.getElements();
          });
      }
    });
  }
}
