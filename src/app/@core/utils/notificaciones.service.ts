import {NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService} from '@nebular/theme';
import {Injectable} from '@angular/core';


@Injectable()
export class NotificacionesService {
  position: NbGlobalPosition = NbGlobalPhysicalPosition.BOTTOM_RIGHT;
  types: NbComponentStatus[] = [
    'primary',
    'success',
    'info',
    'warning',
    'danger',
  ];

  constructor(private toastrService: NbToastrService) {
  }

  /*
  *  1 => 'primary',
  *  2 => 'success',
  *  3 => 'info',
  *  4=> 'warning',
  *  5=> 'danger',
  * */
  personalizado(titulo = null, mensaje = null, tipo = 1) {
    const config = {
      status: this.types[tipo],
      position: this.position,
      body: mensaje,
    };
    this.toastrService.show(
      mensaje,
      titulo,
      config);
  }

  procesoExitoso() {
    const config = {
      status: this.types[1],
      position: this.position,
    };
    this.toastrService.show(
      '',
      'Proceso completado exitosamente.',
      config);
  }


  guardadoExitoso() {
    const config = {
      status: this.types[1],
      position: this.position,
    };
    this.toastrService.show(
      '',
      'Guardado exitosamente.',
      config);
  }

  actualizadoExitoso() {
    const config = {
      status: this.types[1],
      position: this.position,
    };
    this.toastrService.show(
      '',
      'Actualizado exitosamente.',
      config);
  }

  eliminadoExitoso() {
    const config = {
      status: this.types[1],
      position: this.position,
    };
    this.toastrService.show(
      '',
      'Eliminado exitosamente.',
      config);
  }

  // static MsgJGrowl(header = '',
  //                  content = 'Guardado exitosamente.',
  //                  theme = 'alert-styled-left  alert-success  alert-arrow-left',
  //                  position = 'bottom-right') {
  //   jQuery.jGrowl(content, {
  //     header: header,
  //     theme: theme,
  //     position: position,
  //   });
  // }

  // static MsgNoty(type, progressBar = true, position = 'bottomRight', text = 'Guardado exitosamente.') {
  //
  //   // if (theme) {
  //   new Noty({
  //     theme: ' alert alert-' + type + ' alert-styled-left p-0 bg-white',
  //     text: text,
  //     progressBar: progressBar,
  //     layout: position,
  //     timeout: 2500
  //   }).show();
  //   /*  } else {
  //       new Noty({
  //         text: text,
  //         progressBar: progressBar,
  //         layout: position,
  //         type: type
  //       }).show();
  //     }*/
  //
  // }

  // static guardadoExitoso() {
  //   new Noty({
  //     theme: ' alert alert-success alert-styled-left p-0 bg-white',
  //     text: 'Guardado exitosamente.',
  //     progressBar: true,
  //     layout: 'bottomRight',
  //     timeout: 2500
  //   }).show();
  // }
  //
  // static actualizadoExitoso() {
  //   new Noty({
  //     theme: ' alert alert-success alert-styled-left p-0 bg-white',
  //     text: 'Actualizado exitosamente.',
  //     progressBar: true,
  //     layout: 'bottomRight',
  //     timeout: 2500
  //   }).show();
  // }
  //
  // static eliminadoExitoso() {
  //   new Noty({
  //     theme: ' alert alert-success alert-styled-left p-0 bg-white',
  //     text: 'Eliminado exitosamente.',
  //     progressBar: true,
  //     layout: 'bottomRight',
  //     timeout: 2500
  //   }).show();
  // }
  //
  // static errorProceso() {
  //   new Noty({
  //     theme: ' alert alert-warning alert-styled-left p-0 bg-white',
  //     text: 'El proceso no pudo completarse.',
  //     progressBar: true,
  //     layout: 'bottomRight',
  //     timeout: 2500
  //   }).show();
  // }
  //
  // static pesoMaximo(max_peso) {
  //   new Noty({
  //     theme: ' alert alert-warning alert-styled-left p-0 bg-white',
  //     text: 'El peso del archivo es superior a ' + max_peso,
  //     progressBar: true,
  //     layout: 'bottomRight',
  //     timeout: 2500
  //   }).show();
  // }
  //
  // static resolucionMinima(min_resolucion) {
  //   new Noty({
  //     theme: ' alert alert-warning alert-styled-left p-0 bg-white',
  //     text: 'La imagen debe ser de al menos ' + min_resolucion + 'px.',
  //     progressBar: true,
  //     layout: 'bottomRight',
  //     timeout: 2500
  //   }).show();
  // }
  //
  // static resolucionMaxima(max_resolucion) {
  //   new Noty({
  //     theme: ' alert alert-warning alert-styled-left p-0 bg-white',
  //     text: 'La imagen debe ser de máximo ' + max_resolucion + 'px.',
  //     progressBar: true,
  //     layout: 'bottomRight',
  //     timeout: 2500
  //   }).show();
  // }
  //
  // static mensajePersonalizado(mensaje: string = '', tipo: 'success' |
  // 'danger' | 'warning' | 'primary' = 'success', barraProgreso: boolean = true, duracion: number = 2500) {
  //   new Noty({
  //     theme: ` alert alert-${tipo} alert-styled-left p-0 bg-white`,
  //     text: `${mensaje}.`,
  //     progressBar: barraProgreso,
  //     layout: 'bottomRight',
  //     timeout: duracion
  //   }).show();
  // }
}
