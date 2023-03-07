import {Component, OnInit, ViewChild} from '@angular/core';
import {ExpensesService} from '../../../@core/services/expenses.service';
import {ModalesService} from '../../../@core/utils/modales.service';

import {
  NbDialogService,
} from '@nebular/theme';
import {ConfirmDeleteComponent} from '../../../@theme/components/confirm-delete/confirm-delete.component';
import {NotificacionesService} from '../../../@core/utils/notificaciones.service';
import * as moment from 'moment';

import { MbscDatetimeOptions} from '../../../../assets/mobiscroll/js/mobiscroll.angular.min';

@Component({
  selector: 'ngx-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss'],
})
export class ExpensesListComponent implements OnInit {
  dateChange: any;
  dateNow: any;
  month_onlySettings: MbscDatetimeOptions = {
    lang: 'es',
    dateFormat: 'MM yy',
    returnFormat: 'iso8601',
  };


  data: any;
  loading = true;
  key: string = null;
  reverse: boolean = true;
  totalPendiente = 0;
  totalPagado = 0;
  total = 0;

  constructor(public _expensesService: ExpensesService,
              public _notificacionesService: NotificacionesService,
              private dialogService: NbDialogService,
              private _modalesService: ModalesService) {
    this.dateChange = moment();
    this.dateNow = moment();
    this.data = [];

  }

  nextMonth() {
    const add = this.dateChange.add(1, 'months');
    this.dateNow = add.toISOString().split('.')[0];
    this.getExpenses();
  }

  preMonth() {
    const remove = this.dateChange.subtract(1, 'months');
    this.dateNow = remove.toISOString().split('.')[0];
    this.getExpenses();
  }

  setMonth($event) {
    this.dateChange = moment($event.valueText);
    this.dateNow = moment($event.valueText);
    this.getExpenses();
  }

  setOrder(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  getFormatDate(date) {
    return moment(date).format('ddd D MMM YYYY');
  }

  ngOnInit() {
    this.getExpenses();
    this._modalesService.listarGasto$.subscribe((msg) => {
      if (msg) {
        this._modalesService.setValueGasto(false);
        this.getExpenses();
      }
    });

  }

  getExpenses() {
    const check = moment(this.dateNow, 'YYYY/MM/DD');
    const month = check.format('M');
    const year = check.format('YYYY');

    this.totalPendiente = 0;
    this.totalPagado = 0;
    this.total = 0;
    this.loading = true;
    const params = {
      with: 'type,bill',
      month: month,
      year: year,
    };
    this._expensesService.index(params).subscribe((resp: any) => {
      const pendiente: any = resp.filter(item => item.paid === false);
      const pagado: any = resp.filter(item => item.paid === true);
      this.totalPagado += pagado.reduce((total, objecto) => total += objecto.amount, 0);
      this.totalPendiente += pendiente.reduce((total, objecto) => total += objecto.amount, 0);
      this.total += resp.reduce((total, objecto) => total += objecto.amount, 0);
      this.data = resp;
      this.loading = false;
    });
  }


  update(item) {
    const obj = {
      data: item,
    };
    this._modalesService.abrirModalGasto(obj);
  }

  deleteE(id) {
    const dialogRef = this.dialogService.open(ConfirmDeleteComponent, {autoFocus: false});
    dialogRef.onClose.subscribe((resp) => {
      if (resp) {
        this.loading = true;
        this._expensesService.delete(id)
          .subscribe(() => {
            this._notificacionesService.eliminadoExitoso();
            this.getExpenses();
          });
      }
    });
  }
}
