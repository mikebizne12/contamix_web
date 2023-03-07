import {Component, OnInit} from '@angular/core';
import {IncomesService} from '../../../@core/services/incomes.service';

import * as moment from 'moment';
import {NotificacionesService} from '../../../@core/utils/notificaciones.service';
import {NbDialogService} from '@nebular/theme';
import {ModalesService} from '../../../@core/utils/modales.service';
import {ConfirmDeleteComponent} from '../../../@theme/components/confirm-delete/confirm-delete.component';
import { MbscDatetimeOptions} from '../../../../assets/mobiscroll/js/mobiscroll.angular.min';

@Component({
  selector: 'ngx-incomes-list',
  templateUrl: './incomes-list.component.html',
  styleUrls: ['./incomes-list.component.scss'],
})
export class IncomesListComponent implements OnInit {
  data: any;
  loading = true;
  key: string = null;
  reverse: boolean = true;
  totalPendiente = 0;
  totalRecibido = 0;
  total = 0;

  dateChange: any;
  dateNow: any;
  month_onlySettings: MbscDatetimeOptions = {
    lang: 'es',
    dateFormat: 'MM yy',
    returnFormat: 'iso8601',
  };

  constructor(public _incomes: IncomesService,
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
    this.getIncomes();
  }

  preMonth() {
    const remove = this.dateChange.subtract(1, 'months');
    this.dateNow = remove.toISOString().split('.')[0];
    this.getIncomes();
  }

  setMonth($event) {
    this.dateChange = moment($event.valueText);
    this.dateNow = moment($event.valueText);
    this.getIncomes();
  }

  setOrder(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  getFormatDate(date) {
    return moment(date).format('ddd D MMM YYYY');
  }

  ngOnInit() {
    this.getIncomes();
    this._modalesService.listarIngreso$.subscribe((msg) => {
      if (msg) {
        this._modalesService.setValueIngreso(false);
        this.getIncomes();
      }
    });
  }

  getIncomes() {
    const check = moment(this.dateNow, 'YYYY/MM/DD');
    const month = check.format('M');
    const year = check.format('YYYY');
    this.totalPendiente = 0;
    this.totalRecibido = 0;
    this.total = 0;
    this.loading = true;
    const params = {
      with: 'type,bill',
      month: month,
      year: year,
    };
    this._incomes.index(params).subscribe((resp: any) => {
      const pendiente: any = resp.filter(item => item.received === false);
      const recibido: any = resp.filter(item => item.received === true);
      this.totalRecibido += recibido.reduce((total, objecto) => total += objecto.amount, 0);
      this.totalPendiente += pendiente.reduce((total, objecto) => total += objecto.amount, 0);
      this.total += resp.reduce((total, objecto) => total += objecto.amount, 0);
      this.data = resp;
      this.loading = false;
    });
  }

  changeMonth() {
    this.getIncomes();
  }

  update(item) {
    const obj = {
      data: item,
    };
    this._modalesService.abrirModalIngreso(obj);
  }

  deleteE(id) {
    const dialogRef = this.dialogService.open(ConfirmDeleteComponent, {autoFocus: false});
    dialogRef.onClose.subscribe((resp) => {
      if (resp) {
        this.loading = true;
        this._incomes.delete(id)
          .subscribe(() => {
            this._notificacionesService.eliminadoExitoso();
            this.getIncomes();
          });
      }
    });
  }

}
