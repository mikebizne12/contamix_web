import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotificacionesService} from "../../../@core/utils/notificaciones.service";
import {TypesCrudComponent} from "../../types/types-crud/types-crud.component";
import {NbDialogRef} from "@nebular/theme";
import {BillsService} from "../../../@core/services/bills.service";

@Component({
  selector: 'ngx-bills-crud',
  templateUrl: './bills-crud.component.html',
  styleUrls: ['./bills-crud.component.scss']
})
export class BillsCrudComponent implements OnInit {
  form: FormGroup;
  loading = false;
  titulo: any = 'Agregar';
  data: any = null;
  iconos: any = null;

  constructor(public _formBuilder: FormBuilder,
              public _billsService: BillsService,
              public _notificacionesService: NotificacionesService,
              protected ref: NbDialogRef<BillsCrudComponent>) {
    this._crearForm();
  }

  ngOnInit() {
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
    this._billsService.store(this.form.value).subscribe((resp) => {
      this.loading = false;
      this._notificacionesService.guardadoExitoso();
      this.ref.close(1);
    }, (error) => this.loading = false);

  }

  update() {

    this._billsService.update(this.data.id, this.form.value).subscribe((resp) => {
      this.loading = false;
      this._notificacionesService.actualizadoExitoso();
      this.ref.close(1);
    }, (error) => this.loading = false);
  }

  private _crearForm() {
    this.form = this._formBuilder.group({
      name: [null, Validators.required],
      icon: [null, Validators.required]
    });
  }

}
