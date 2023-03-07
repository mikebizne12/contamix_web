import {Component, OnInit} from '@angular/core';
import {BillsService} from '../../../@core/services/bills.service';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {FaIconLibrary} from '@fortawesome/angular-fontawesome';
import {forkJoin, Observable} from 'rxjs/index';
import {IconsService} from '../../../@core/services/icons.service';
import {TypesCrudComponent} from '../../types/types-crud/types-crud.component';
import {ConfirmDeleteComponent} from '../../../@theme/components/confirm-delete/confirm-delete.component';
import {NotificacionesService} from '../../../@core/utils/notificaciones.service';
import {NbDialogService} from '@nebular/theme';
import {BillsCrudComponent} from '../bills-crud/bills-crud.component';
import {MbscDatetimeOptions} from "../../../../assets/mobiscroll/src/js/presets/datetimebase";
import * as moment from "moment";


@Component({
  selector: 'ngx-bills-list',
  templateUrl: './bills-list.component.html',
  styleUrls: ['./bills-list.component.scss'],
})
export class BillsListComponent implements OnInit {
  data: any;
  type = 'month';
  types = ['week', 'month', 'year'];
  items = [
    {title: 'Eliminar'},
    {title: 'Transacciones'},
    {title: 'Reajustar'},
    {title: 'Editar'},
  ];

  obj = {
    data: null,
    iconos: null,
  };
  loading = true;

  dateChange: any;
  dateNow: any;
  month_onlySettings: MbscDatetimeOptions = {
    lang: 'es',
    dateFormat: 'MM yy',
    returnFormat: 'iso8601',
  };

  constructor(
    library: FaIconLibrary,
    public _iconsService: IconsService,
    public _notificacionesService: NotificacionesService,
    private dialogService: NbDialogService,
    public _billsService: BillsService) {
    this.dateChange = moment();
    this.dateNow = moment();
    library.addIconPacks(fas);
    this.data = [];
  }


  private _requestMultiple(): Observable<any[]> {
    const check = moment(this.dateNow, 'YYYY/MM/DD');
    const month = check.format('M');
    const year = check.format('YYYY');
    const params = {
      with: 'type,bill',
      month: month,
      year: year,
      totals: 1,
    };
    const resp1 = this._iconsService.index();
    const resp2 = this._billsService.index(params);
    return forkJoin([resp1, resp2]);
  }


  ngOnInit() {
    this.getElements();
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
    const dialogRef = this.dialogService.open(BillsCrudComponent, {
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
        this._billsService.delete(id)
          .subscribe(() => {
            this._notificacionesService.eliminadoExitoso();
            this.getElements();
          });
      }
    });
  }

}
