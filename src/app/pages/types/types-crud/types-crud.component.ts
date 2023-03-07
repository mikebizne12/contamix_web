import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IncomesTypesService} from '../../../@core/services/incomes-types.service';
import {NotificacionesService} from '../../../@core/utils/notificaciones.service';
import {NbDialogRef} from '@nebular/theme';
import {ExpensesTypesService} from '../../../@core/services/expenses-types.service';

@Component({
  selector: 'ngx-types-crud',
  templateUrl: './types-crud.component.html',
  styleUrls: ['./types-crud.component.scss'],
})
export class TypesCrudComponent implements OnInit {
  form: FormGroup;
  loading = false;
  titulo: any = 'Agregar';
  data: any = null;
  tipo: any = null;
  iconos: any = null;
  colorBtn = 'success';

  constructor(public _incomesTypesService: IncomesTypesService,
              public _expensesTypesService: ExpensesTypesService,
              public _formBuilder: FormBuilder,
              public _notificacionesService: NotificacionesService,
              protected ref: NbDialogRef<TypesCrudComponent>) {
    this._crearForm();

  }

  ngOnInit() {
    if (!this.tipo) {
      this.colorBtn = 'danger';
    }
    if (this.data) {
      this.titulo = 'Editar';
      this.form.controls['name'].setValue(this.data.name);
      this.form.controls['icon'].setValue(this.data.icon);

    }
  }

  seleccionarIcono(nombre) {
    this.form.controls['icon'].setValue(nombre);
  }

  cancel() {
    this.ref.close();
  }

  submit() {
    this.loading = true;
    if (this.data) {
      this.update();
    } else {
      this.create();
    }
  }

  create() {
    if (this.tipo) {
      this._incomesTypesService.store(this.form.value).subscribe((resp) => {
        this.loading = false;
        this._notificacionesService.guardadoExitoso();
        this.ref.close(1);
      }, (error) => this.loading = false);
    } else {
      this._expensesTypesService.store(this.form.value).subscribe((resp) => {
        this.loading = false;
        this._notificacionesService.guardadoExitoso();
        this.ref.close(1);
      }, (error) => this.loading = false);
    }
  }

  update() {
    if (this.tipo) {
      this._incomesTypesService.update(this.data.id, this.form.value).subscribe((resp) => {
        this.loading = false;
        this._notificacionesService.actualizadoExitoso();
        this.ref.close(1);
      }, (error) => this.loading = false);
    } else {
      this._expensesTypesService.update(this.data.id, this.form.value).subscribe((resp) => {
        this.loading = false;
        this._notificacionesService.actualizadoExitoso();
        this.ref.close(1);
      }, (error) => this.loading = false);
    }
  }


  private _crearForm() {
    this.form = this._formBuilder.group({
      name: [null, Validators.required],
      icon: [null, Validators.required],
      color: ['#000000', Validators.required],
    });
  }

}
