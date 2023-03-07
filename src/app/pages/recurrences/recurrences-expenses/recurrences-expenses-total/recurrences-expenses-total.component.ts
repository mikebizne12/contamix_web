import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ngx-recurrences-expenses-total',
  templateUrl: './recurrences-expenses-total.component.html',
  styleUrls: ['./recurrences-expenses-total.component.scss'],
})
export class RecurrencesExpensesTotalComponent implements OnInit {
  @Input() totalPendiente: number = 0;
  @Input() totalRecibido: number = 0;
  @Input() total: number = 0;
  @Input() loading: any;

  constructor() {
  }

  ngOnInit() {
  }

}
