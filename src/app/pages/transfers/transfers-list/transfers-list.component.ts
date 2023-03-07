import {Component, OnInit} from '@angular/core';
import {NotificacionesService} from '../../../@core/utils/notificaciones.service';
import {NbDialogService} from '@nebular/theme';
import {ModalesService} from '../../../@core/utils/modales.service';
import {TransfersService} from '../../../@core/services/transfers.service';
import * as moment from 'moment';
import {ConfirmDeleteComponent} from '../../../@theme/components/confirm-delete/confirm-delete.component';

import {MbscDatetimeOptions} from '../../../../assets/mobiscroll/js/mobiscroll.angular.min';

@Component({
  selector: 'ngx-transfers-list',
  templateUrl: './transfers-list.component.html',
  styleUrls: ['./transfers-list.component.scss'],
})
export class TransfersListComponent implements OnInit {

  total = 0;
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

  constructor(public _transfersService: TransfersService,
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
    this.getElements();
  }

  preMonth() {
    const remove = this.dateChange.subtract(1, 'months');
    this.dateNow = remove.toISOString().split('.')[0];
    this.getElements();
  }

  setMonth($event) {
    this.dateChange = moment($event.valueText);
    this.dateNow = moment($event.valueText);
    this.getElements();
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
    this._modalesService.listarTransferencia$.subscribe((msg) => {
      if (msg) {
        this._modalesService.setValueTransferencia(false);
        this.getElements();
      }
    });

  }

  getElements() {
    const check = moment(this.dateNow, 'YYYY/MM/DD');
    const month = check.format('M');
    const year = check.format('YYYY');
    this.total = 0;
    this.loading = true;
    const params = {
      with: 'transfer_expense.bill,transfer_income.bill',
      month: month,
      year: year,
    };
    this._transfersService.index(params).subscribe((resp: any) => {
      this.data = resp;
      this.total += resp.reduce((total, objecto) => total += objecto.amount, 0);
      this.loading = false;
    });
  }

  changeMonth() {
    this.getElements();
  }

  update(item) {
    const obj = {
      data: item,
    };
    this._modalesService.abrirModalTransferencia(obj);
  }

  deleteE(id) {
    const dialogRef = this.dialogService.open(ConfirmDeleteComponent, {autoFocus: false});
    dialogRef.onClose.subscribe((resp) => {
      if (resp) {
        this.loading = true;
        this._transfersService.delete(id)
          .subscribe(() => {
            this._notificacionesService.eliminadoExitoso();
            this.getElements();
          });
      }
    });
  }

}
