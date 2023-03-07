import {Component, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";

@Component({
  selector: 'ngx-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  constructor(protected dialogRef: NbDialogRef<ConfirmComponent>) {
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
