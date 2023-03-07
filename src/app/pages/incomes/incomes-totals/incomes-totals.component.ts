import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ngx-incomes-totals',
  templateUrl: './incomes-totals.component.html',
  styleUrls: ['./incomes-totals.component.scss'],
})
export class IncomesTotalsComponent implements OnInit {
  @Input() totalPendiente: number = 0;
  @Input() totalRecibido: number = 0;
  @Input() total: number = 0;
  @Input() loading: any;

  constructor() {
  }

  ngOnInit() {
  }

}
