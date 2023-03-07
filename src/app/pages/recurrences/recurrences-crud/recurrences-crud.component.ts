import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IncomesTypesService} from '../../../@core/services/incomes-types.service';
import {NbDialogRef} from '@nebular/theme';
import {NotificacionesService} from '../../../@core/utils/notificaciones.service';
import {BillsService} from '../../../@core/services/bills.service';
import {Observable, forkJoin} from 'rxjs';
import * as moment from 'moment';
import {RecurrencesService} from '../../../@core/services/recurrences.service';
import {IncomesRecurrencesService} from '../../../@core/services/incomes-recurrences.service';
import {ExpensesTypesService} from '../../../@core/services/expenses-types.service';
import {ExpensesRecurrencesService} from '../../../@core/services/expenses-recurrences.service';

@Component({
  selector: 'ngx-recurrences-crud',
  templateUrl: './recurrences-crud.component.html',
  styleUrls: ['./recurrences-crud.component.scss'],
})
export class RecurrencesCrudComponent implements OnInit {
  form: FormGroup;
  tipos = [];
  cuentas = [];
  tiposRecurrencias = [];
  diasSemanas = [];
  mostrarDias = false;
  mostrarSemanas = false;
  loading = true;
  data: any = null;
  titulo: any = 'Programar cobro';
  categoriaSeleccionada = '';
  cuentaSeleccionada = '';
  tipo: any = null;
  colorBtn = 'success';

  constructor(
    public _typeIncomes: IncomesTypesService,
    public _typeExpenses: ExpensesTypesService,
    public _incomesRecurrencesService: IncomesRecurrencesService,
    public _expensesRecurrencesService: ExpensesRecurrencesService,
    public _recurrencesService: RecurrencesService,
    public _billsService: BillsService,
    public _formBuilder: FormBuilder,
    public _notificacionesService: NotificacionesService,
    protected ref: NbDialogRef<RecurrencesCrudComponent>) {
  }

  private _requestMultiple(): Observable<any[]> {
    const resp1 = this._typeIncomes.index();
    const resp2 = this._billsService.index();
    const resp3 = this._recurrencesService.index();
    const resp4 = this._recurrencesService.aux();
    const resp5 = this._typeExpenses.index();
    return forkJoin([resp1, resp2, resp3, resp4, resp5]);
  }

  ngOnInit() {
    if (this.tipo) {
      this._crearFormCobro();
      this.actualizarCobro();
    } else {
      this.titulo = 'Programar pago';
      this.colorBtn = 'danger';
      this._crearFormGasto();
      this.actualizarGasto();
    }

  }

  actualizarCobro() {
    const fechaDefault = moment();
    this.form.controls['date_aux'].setValue(fechaDefault);
    this.form.controls['date'].setValue(fechaDefault.format('YYYY-MM-DD'));
    this._requestMultiple().subscribe(responseList => {
      this.tipos = responseList[0];
      this.cuentas = responseList[1];
      this.tiposRecurrencias = responseList[2];
      this.diasSemanas = responseList[3];
      if (this.data) {
        this.titulo = 'Actualizar cobro';
        const fecha = moment(this.data.date);
        this.form.controls['date_aux'].setValue(fecha);
        this.form.controls['date'].setValue(this.data.date);
        this.form.controls['day'].setValue(this.data.day);
        this.form.controls['total'].setValue(this.data.total);
        this.form.controls['count'].setValue(this.data.count);
        this.form.controls['amount'].setValue(this.data.amount);
        this.form.controls['description'].setValue(this.data.description);
        setTimeout(() => {
          this.form.controls['income_type_id'].setValue(this.data.income_type_id);
          this.form.controls['bill_id'].setValue(this.data.bill_id);
          this.getCategoriaSeleccionada();
          this.getCuentaSeleccionada();
          this.setDia(this.data.recurrence_id);
          this.form.controls['recurrence_id'].setValue(this.data.recurrence_id);
        }, 5);
      }
      this.loading = false;
    });
  }

  actualizarGasto() {
    const fechaDefault = moment();
    this.form.controls['date_aux'].setValue(fechaDefault);
    this.form.controls['date'].setValue(fechaDefault.format('YYYY-MM-DD'));
    this._requestMultiple().subscribe(responseList => {
      this.tipos = responseList[4];
      this.cuentas = responseList[1];
      this.tiposRecurrencias = responseList[2];
      this.diasSemanas = responseList[3];
      if (this.data) {
        this.titulo = 'Actualizar pago';
        const fecha = moment(this.data.date);
        this.form.controls['date_aux'].setValue(fecha);
        this.form.controls['date'].setValue(this.data.date);
        this.form.controls['day'].setValue(this.data.day);
        this.form.controls['total'].setValue(this.data.total);
        this.form.controls['count'].setValue(this.data.count);
        this.form.controls['amount'].setValue(this.data.amount);
        this.form.controls['description'].setValue(this.data.description);
        setTimeout(() => {
          this.form.controls['expense_type_id'].setValue(this.data.expense_type_id);
          this.form.controls['bill_id'].setValue(this.data.bill_id);
          this.getCategoriaSeleccionada();
          this.getCuentaSeleccionada();
          this.setDia(this.data.recurrence_id);
          this.form.controls['recurrence_id'].setValue(this.data.recurrence_id);
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
    if (this.tipo) {
      this._incomesRecurrencesService.store(this.form.value).subscribe((resp) => {
        this.loading = false;
        this._notificacionesService.guardadoExitoso();
        this.ref.close(1);
      });
    } else {
      this._expensesRecurrencesService.store(this.form.value).subscribe((resp) => {
        this.loading = false;
        this._notificacionesService.guardadoExitoso();
        this.ref.close(1);
      });
    }
  }

  update() {
    if (this.tipo) {
      this._incomesRecurrencesService.update(this.data.id, this.form.value).subscribe((resp) => {
        this.loading = false;
        this._notificacionesService.actualizadoExitoso();
        this.ref.close(1);
      });
    } else {
      this._expensesRecurrencesService.update(this.data.id, this.form.value).subscribe((resp) => {
        this.loading = false;
        this._notificacionesService.actualizadoExitoso();
        this.ref.close(1);
      });
    }
  }

  private _crearFormCobro() {
    this.form = this._formBuilder.group({
      date_aux: [null, Validators.required],
      date: [null],
      day: [0],
      total: [1, Validators.required],
      count: [0, Validators.required],
      amount: [0, Validators.required],
      description: [null, Validators.required],
      recurrence_id: [false, Validators.required],
      income_type_id: [null, Validators.required],
      bill_id: [null, Validators.required],
    });
  }

  private _crearFormGasto() {
    this.form = this._formBuilder.group({
      date_aux: [null, Validators.required],
      date: [null],
      day: [0],
      total: [1, Validators.required],
      count: [0, Validators.required],
      amount: [0, Validators.required],
      description: [null, Validators.required],
      recurrence_id: [false, Validators.required],
      expense_type_id: [null, Validators.required],
      bill_id: [null, Validators.required],
    });
  }

  setDia($event) {
    this.form.controls['day'].setValue(0);
    this.mostrarDias = false;
    this.mostrarSemanas = false;
    const tipo = this.tiposRecurrencias.find(x => x.id === $event);
    if (tipo.days) {
      this.mostrarDias = true;
      this.addDayRule();
    } else {
      this.cleanDayRule();
    }
    if (tipo.days_of_week) {
      this.mostrarSemanas = true;
      this.addDayRule();
    } else {
      this.cleanDayRule();
    }

  }

  addDayRule() {
    this.form.controls['day'].setValue(0);
    this.form.controls['day'].setValidators(Validators.required);
    this.form.controls['day'].updateValueAndValidity();
  }

  cleanDayRule() {
    this.form.controls['day'].setValue(0);
    this.form.controls['day'].clearValidators();
    this.form.controls['day'].updateValueAndValidity();
  }

  getCategoriaSeleccionada() {
    let id = 0;
    if (this.tipo) {
      id = this.form.get('income_type_id').value;
    } else {
      id = this.form.get('expense_type_id').value;
    }
    this.categoriaSeleccionada = this.tipos.find(obj => obj.id === id);

  }

  getCuentaSeleccionada() {
    const id = this.form.get('bill_id').value;
    this.cuentaSeleccionada = this.cuentas.find(obj => obj.id === id);
  }
}
