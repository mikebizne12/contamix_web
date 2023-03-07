import {Component, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import * as moment from 'moment';
import {BillsService} from '../../../../@core/services/bills.service';
import {Observable, forkJoin} from 'rxjs';
import {NotificacionesService} from '../../../../@core/utils/notificaciones.service';
import {IncomesService} from '../../../../@core/services/incomes.service';
import {IncomesTypesService} from '../../../../@core/services/incomes-types.service';

@Component({
  selector: 'ngx-modal-expenses',
  templateUrl: './modal-incomes.component.html',
  styleUrls: ['./modal-incomes.component.scss'],
})
export class ModalIncomesComponent implements OnInit {
  form: FormGroup;
  tipos = [];
  cuentas = [];
  loading = true;
  data: any = null;
  titulo: any = 'Registrar';
  categoriaSeleccionada = '';
  cuentaSeleccionada = '';


  constructor(
    public _type: IncomesTypesService,
    public _incomesService: IncomesService,
    public _billsService: BillsService,
    public _formBuilder: FormBuilder,
    public _notificacionesService: NotificacionesService,
    protected ref: NbDialogRef<ModalIncomesComponent>) {
    this._crearForm();
  }

  private _requestMultiple(): Observable<any[]> {
    const resp1 = this._type.index();
    const resp2 = this._billsService.index();
    return forkJoin([resp1, resp2]);
  }

  ngOnInit() {
    const fechaDefault = moment();
    this.form.controls['date_aux'].setValue(fechaDefault);
    this.form.controls['date'].setValue(fechaDefault.format('YYYY-MM-DD'));
    this._requestMultiple().subscribe(responseList => {
      this.tipos = responseList[0];
      this.cuentas = responseList[1];
      if (this.data) {
        this.titulo = 'Actualizar';
        const fecha = moment(this.data.date);
        this.form.controls['date_aux'].setValue(fecha);
        this.form.controls['date'].setValue(this.data.date);
        this.form.controls['amount'].setValue(this.data.amount);
        this.form.controls['description'].setValue(this.data.description);
        this.form.controls['received'].setValue(this.data.received);
        setTimeout(() => {
          this.form.controls['income_type_id'].setValue(this.data.income_type_id);
          this.form.controls['bill_id'].setValue(this.data.bill_id);
          this.getCategoriaSeleccionada();
          this.getCuentaSeleccionada();
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
    this._incomesService.store(this.form.value).subscribe((resp) => {
      this.loading = false;
      this._notificacionesService.guardadoExitoso();
      this.ref.close(1);
    });
  }

  update() {
    this._incomesService.update(this.data.id, this.form.value).subscribe((resp) => {
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
      received: [false, Validators.required],
      income_type_id: [null, Validators.required],
      bill_id: [null, Validators.required],
    });
  }

  getCategoriaSeleccionada() {
    const id = this.form.get('income_type_id').value;
    this.categoriaSeleccionada = this.tipos.find(obj => obj.id === id);
  }

  getCuentaSeleccionada() {
    const id = this.form.get('bill_id').value;
    this.cuentaSeleccionada = this.cuentas.find(obj => obj.id === id);
  }
}
