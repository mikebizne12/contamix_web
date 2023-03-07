import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {NbDialogService} from '@nebular/theme';
import {ModalExpensesComponent} from '../../@theme/components/modal/modal-expenses/modal-expenses.component';
import {ModalIncomesComponent} from '../../@theme/components/modal/modal-incomes/modal-incomes.component';
import {ModalTransfersComponent} from '../../@theme/components/modal/modal-transfers/modal-transfers.component';

@Injectable()
export class ModalesService {

  private _listarIngreso: BehaviorSubject<boolean>;
  public listarIngreso$: Observable<boolean>;

  private _listarGasto: BehaviorSubject<boolean>;
  public listarGasto$: Observable<boolean>;

  private _listarTransferencia: BehaviorSubject<boolean>;
  public listarTransferencia$: Observable<boolean>;

  constructor(private dialogService: NbDialogService) {
  }

  iniciar() {
    this._listarIngreso = new BehaviorSubject<boolean>(false);
    this.listarIngreso$ = this._listarIngreso.asObservable();
    this._listarGasto = new BehaviorSubject<boolean>(false);
    this.listarGasto$ = this._listarGasto.asObservable();
    this._listarTransferencia = new BehaviorSubject<boolean>(false);
    this.listarTransferencia$ = this._listarTransferencia.asObservable();
  }


  abrirModalIngreso(obj) {
    const dialogRef = this.dialogService.open(ModalIncomesComponent, {
      context: obj,
    });
    dialogRef.onClose.subscribe((resp) => {
      if (resp) {
        this.setValueIngreso(true);
      }
    });
    return dialogRef;
  }

  abrirModalGasto(obj) {
    const dialogRef = this.dialogService.open(ModalExpensesComponent, {
      context: obj,
    });
    dialogRef.onClose.subscribe((resp) => {
      if (resp) {
        this.setValueGasto(true);
      }
    });
    return dialogRef;
  }

  abrirModalTransferencia(obj) {
    const dialogRef = this.dialogService.open(ModalTransfersComponent, {
      context: obj,
    });
    dialogRef.onClose.subscribe((resp) => {
      if (resp) {
        this.setValueTransferencia(true);
      }
    });
    return dialogRef;
  }


  setValueIngreso(newValue): void {
    this._listarIngreso.next(newValue);
  }

  setValueGasto(newValue): void {
    this._listarGasto.next(newValue);
  }

  setValueTransferencia(newValue): void {
    this._listarTransferencia.next(newValue);
  }

}
