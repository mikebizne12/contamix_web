import {Component} from '@angular/core';
import {CalendarKitMonthCellComponent} from './month-cell/month-cell.component';


import * as moment from 'moment';

@Component({
  selector: 'ngx-calendar-kit',
  templateUrl: 'calendar-kit.component.html',
  styleUrls: ['calendar-kit.component.scss'],
  entryComponents: [CalendarKitMonthCellComponent],
})
export class CalendarKitFullCalendarShowcaseComponent {
  month = moment();
  monthCellComponent = CalendarKitMonthCellComponent;

  months = [
    moment(),
    moment(),
    moment(),
    moment()
  ];

}
