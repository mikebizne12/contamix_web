import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-icon-order',
  templateUrl: './icon-order.component.html',
  styleUrls: ['./icon-order.component.scss']
})
export class IconOrderComponent implements OnInit {
  @Input() name: any = null;
  @Input() key: any = null;
  @Input() reverse: any;

  constructor() {
  }

  ngOnInit() {
  }

  getClass() {
    if (this.reverse) {
      return 'fa fa-caret-up';
    } else {
      return 'fa fa-caret-down';
    }
  }

}
