import {Component, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";

@Component({
  selector: 'ngx-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss']
})
export class ConfirmDeleteComponent implements OnInit {

  constructor(protected dialogRef: NbDialogRef<ConfirmDeleteComponent>) {
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  aceptar() {

    this.dialogRef.close(true);
  }

}
