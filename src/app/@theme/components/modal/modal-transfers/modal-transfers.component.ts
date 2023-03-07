import {Component, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import * as moment from 'moment';
import {BillsService} from '../../../../@core/services/bills.service';
import {Observable, forkJoin} from 'rxjs';
import {NotificacionesService} from '../../../../@core/utils/notificaciones.service';
import {TransfersService} from '../../../../@core/services/transfers.service';
import {IconsService} from "../../../../@core/services/icons.service";

@Component({
  selector: 'ngx-modal-transfers',
  templateUrl: './modal-transfers.component.html',
  styleUrls: ['./modal-transfers.component.scss'],
})
export class ModalTransfersComponent implements OnInit {
  form: FormGroup;
  tipos = [];
  cuentas = [];
  loading = true;
  data: any = null;
  titulo: any = 'Registrar';
  iconos = [];
  cuentaOrigenSeleccionada = '';
  cuentaDestinoSeleccionada = '';

  constructor(
    public _transfersService: TransfersService,
    public _billsService: BillsService,
    public _formBuilder: FormBuilder,
    public _notificacionesService: NotificacionesService,
    protected ref: NbDialogRef<ModalTransfersComponent>) {
    this._crearForm();
  }

  private _requestMultiple(): Observable<any[]> {
    const resp1 = this._billsService.index();
    return forkJoin([resp1]);
  }

  ngOnInit() {
    const fechaDefault = moment();
    this.form.controls['date_aux'].setValue(fechaDefault);
    this.form.controls['date'].setValue(fechaDefault.format('YYYY-MM-DD'));
    this._requestMultiple().subscribe(responseList => {
      this.cuentas = responseList[0];
      if (this.data) {
        this.titulo = 'Actualizar';
        const fecha = moment(this.data.date);
        this.form.controls['date_aux'].setValue(fecha);
        this.form.controls['date'].setValue(this.data.date);
        this.form.controls['amount'].setValue(this.data.amount);
        this.form.controls['description'].setValue(this.data.description);
        setTimeout(() => {
          this.form.controls['bill_income'].setValue(this.data.transfer_income.bill.id);
          this.form.controls['bill_expense'].setValue(this.data.transfer_expense.bill.id);
          this.getCuentaOrigenSeleccionada();
          this.getCuentaDestinoSeleccionada();
        }, 5);
      }
      this.loading = false;
    });
  }

  cancel() {
    this.ref.close();
  }

  submit() {
    this.loading = true;
    const fecha = moment(this.form.get('date_aux').value).format('YYYY-MM-DD');
    this.form.controls['date'].setValue(fecha);
    if (this.data) {
      this.update();
    } else {
      this.create();
    }
  }

  create() {
    this._transfersService.store(this.form.value).subscribe((resp) => {
      this.loading = false;
      this._notificacionesService.guardadoExitoso();
      this.ref.close(1);
    });
  }

  update() {
    this._transfersService.update(this.data.id, this.form.value).subscribe((resp) => {
      this.loading = false;

      this._notificacionesService.actualizadoExitoso();
      this.ref.close(1);
    });
  }

  private _crearForm() {
    this.form = this._formBuilder.group({
      date_aux: [null, Validators.required],
      date: [null],
      amount: [null, Validators.required],
      description: [null, Validators.required],
      bill_income: [null, Validators.required],
      bill_expense: [null, Validators.required],
    });
  }

  getCuentaOrigenSeleccionada() {
    const id = this.form.get('bill_expense').value;
    this.cuentaOrigenSeleccionada = this.cuentas.find(obj => obj.id === id);
  }

  getCuentaDestinoSeleccionada() {
    const id = this.form.get('bill_income').value;
    this.cuentaDestinoSeleccionada = this.cuentas.find(obj => obj.id === id);
  }
}
