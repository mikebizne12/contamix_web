import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbIconLibraries, NbThemeService} from '@nebular/theme';
import {takeWhile} from 'rxjs/operators' ;
import {SolarData} from '../../@core/data/solar';
import {UsersService} from '../../@core/services/users.service';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {FaIconLibrary} from '@fortawesome/angular-fontawesome';
import {ModalesService} from '../../@core/utils/modales.service';
import * as moment from "moment";
import {MbscDatetimeOptions} from "../../../assets/mobiscroll/src/js/presets/datetimebase";

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
  private alive = true;

  solarValue: number;
  lightCard: CardSettings = {
    title: 'Light',
    iconClass: 'nb-lightbulb',
    type: 'primary',
  };
  rollerShadesCard: CardSettings = {
    title: 'Roller Shades',
    iconClass: 'nb-roller-shades',
    type: 'success',
  };
  wirelessAudioCard: CardSettings = {
    title: 'Wireless Audio',
    iconClass: 'nb-audio',
    type: 'info',
  };
  coffeeMakerCard: CardSettings = {
    title: 'Coffee Maker',
    iconClass: 'nb-coffee-maker',
    type: 'warning',
  };

  statusCards: string;

  commonStatusCardsSet: CardSettings[] = [
    this.lightCard,
    this.rollerShadesCard,
    this.wirelessAudioCard,
    this.coffeeMakerCard,
  ];

  statusCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
    dark: CardSettings[];
  } = {
    default: this.commonStatusCardsSet,
    cosmic: this.commonStatusCardsSet,
    corporate: [
      {
        ...this.lightCard,
        type: 'warning',
      },
      {
        ...this.rollerShadesCard,
        type: 'primary',
      },
      {
        ...this.wirelessAudioCard,
        type: 'danger',
      },
      {
        ...this.coffeeMakerCard,
        type: 'info',
      },
    ],
    dark: this.commonStatusCardsSet,
  };

  montos = {
    totals: 0,
    month: {
      expenses: 0,
      incomes: 0,
    },
    bills: [],
  };
  saldo: number;
  loading = true;

  dateChange: any;
  dateNow: any;
  month_onlySettings: MbscDatetimeOptions = {
    lang: 'es',
    dateFormat: 'MM yy',
    returnFormat: 'iso8601',
  };

  constructor(private themeService: NbThemeService,
              iconsLibrary: NbIconLibraries,
              library: FaIconLibrary,
              private _modalesService: ModalesService,
              public _usersService: UsersService,
              private solarService: SolarData) {
    this.dateChange = moment();
    this.dateNow = moment();
    library.addIconPacks(fas);
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
      });

    this.solarService.getSolarData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        this.solarValue = data;
      });

  }

  ngOnInit() {
    this.getElements();
    this._modalesService.listarGasto$.subscribe((msg) => {
      if (msg) {
        this._modalesService.setValueGasto(false);
        this.getElements();
      }
    });
    this._modalesService.listarIngreso$.subscribe((msg) => {
      if (msg) {
        this._modalesService.setValueIngreso(false);
        this.getElements();
      }
    });
    this._modalesService.listarTransferencia$.subscribe((msg) => {
      if (msg) {
        this._modalesService.setValueTransferencia(false);
        this.getElements();
      }
    });
  }

  nextMonth() {
    const add = this.dateChange.add(1, 'months');
    this.dateNow = add.toISOString().split('.')[0];
    this.getElements();
  }

  preMonth() {
    const remove = this.dateChange.subtract(1, 'months');
    this.dateNow = remove.toISOString().split('.')[0];
    this.getElements();
  }

  setMonth($event) {
    this.dateChange = moment($event.valueText);
    this.dateNow = moment($event.valueText);
    this.getElements();
  }

  getElements() {
    const check = moment(this.dateNow, 'YYYY/MM/DD');
    const month = check.format('M');
    const year = check.format('YYYY');
    this.loading = true;
    this.saldo = 0;
    const params = {
      month: month,
      year: year,
    };
    this.montos.month.expenses = 0;
    this.montos.month.incomes = 0;
    this._usersService.statistics(params).subscribe((resp: any) => {
      this.saldo += resp.bills.reduce((total, objecto) => total += objecto.total, 0);
      this.montos = resp;
      this.loading = false;
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
