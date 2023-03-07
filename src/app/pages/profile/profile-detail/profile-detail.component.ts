import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as moment from "moment";
import { NotificacionesService } from "../../../@core/utils/notificaciones.service";
import { UserService } from "../../../@core/mock/users.service";
import { UsersService } from "../../../@core/services/users.service";
import { CuentaUtilsService } from "../../../@core/utils/cuenta-utils.service";
import { FuncionesUtilsService } from "../../../@core/utils/funciones-utils.service";

@Component({
  selector: 'ngx-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit {
  form: FormGroup;
  loading = false;
  elemento = null;

  constructor(public _formBuilder: FormBuilder,
    public _usersService: UsersService,
    public _cuentaUtilsService: CuentaUtilsService,
    public _notificacionesService: NotificacionesService) {

  }

  ngOnInit() {
    this._crearForm();
  }

  private _crearForm() {
    this.form = this._formBuilder.group({
      name: [null, Validators.required],
      username: [null, Validators.required],
      email: [null, Validators.required],
      current_password: [null, Validators.minLength(4)],
      new_password: [null, Validators.minLength(4)],
      repet_new_password: [null],
    });
    // { validator: this._checkPasswords }
    // this.form.get('email').disable();
    this.elemento = this._cuentaUtilsService.obtenerSesion();
    this.form.patchValue(this.elemento);
  }

  private _checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const pass = group.get('new_password').value;
    const confirmPass = group.get('repet_new_password').value;

    return pass === confirmPass ? null : { notSame: true };
  }


  cancel() {
    this.ngOnInit();
  }

  submit() {
    this.loading = true;
    this._usersService.update(this.elemento.id, FuncionesUtilsService.removerAtributosVacios(this.form.value)).subscribe((response:any) => {
      this.loading = false;
      const data = {
        'id': response.id,
        'name': response.name,
        'username': response.username,
        'email': response.email,
        'api_token': response.api_token,
      };
      this._cuentaUtilsService.setearCredenciales(data);
      this._notificacionesService.actualizadoExitoso();
      this.cancel();
    }, (error) => {
      if (error.status === 500) {
        this._notificacionesService.personalizado(error.statusText, this._getLista(error.error.message), 3);
      }
      this.loading = false;
    });
  }

  private _getLista(mensaje) {
    var lista = '';
    for (let i of mensaje) {
      lista += '' + i + '. ';
    }
    return lista;
  }

  // validarBoton() {
  //   let pass = false;
  //   if (this.form.get('new_password').value) {
  //     if (this.form.get('repet_new_password').value) {
  //       pass = false;
  //     } else {
  //       pass = true;
  //     }
  //   } else {
  //     pass = false;
  //   }




    // return this.form.invalid && pass;
  // }




}
