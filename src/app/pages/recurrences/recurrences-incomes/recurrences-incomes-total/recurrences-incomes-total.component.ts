import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ngx-recurrences-incomes-total',
  templateUrl: './recurrences-incomes-total.component.html',
  styleUrls: ['./recurrences-incomes-total.component.scss']
})
export class RecurrencesIncomesTotalComponent implements OnInit {
  @Input() totalPendiente: number = 0;
  @Input() totalRecibido: number = 0;
  @Input() total: number = 0;
  @Input() loading: any;
  constructor() { }

  ngOnInit() {
  }

}
