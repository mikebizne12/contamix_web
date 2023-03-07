import {Component, OnInit} from '@angular/core';
import {IconsService} from '../../@core/services/icons.service';
import {forkJoin, Observable} from 'rxjs';

@Component({
  selector: 'ngx-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss'],
})
export class TypesComponent implements OnInit {

  icons: any;

  constructor(public _iconsService: IconsService) {
    this.icons = [];
  }

  private _requestMultiple(): Observable<any[]> {
    const resp1 = this._iconsService.index();
    // const resp2 = this._incomesTypesService.index();
    // const resp3 = this._expensesTypesService.index();
    return forkJoin([resp1]);
  }

  ngOnInit() {
    this.getElements();
  }

  getElements() {
    this._requestMultiple().subscribe(responseList => {
      this.icons = responseList[0];
    });
  }

}
