import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ngx-expenses-totals',
  templateUrl: './expenses-totals.component.html',
  styleUrls: ['./expenses-totals.component.scss']
})
export class ExpensesTotalsComponent implements OnInit {
  @Input() totalPendiente: number = 0;
  @Input() totalPagado: number = 0;
  @Input() total: number = 0;
  @Input() loading: any;
  constructor() { }

  ngOnInit() {
  }

}
