import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ngx-transfers-totals',
  templateUrl: './transfers-totals.component.html',
  styleUrls: ['./transfers-totals.component.scss']
})
export class TransfersTotalsComponent implements OnInit {
  @Input() totalPendiente: number = 0;
  @Input() totalRecibido: number = 0;
  @Input() total: number = 0;
  @Input() loading: any;
  constructor() { }

  ngOnInit() {
  }

}
