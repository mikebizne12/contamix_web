import { EventEmitter, ElementRef, NgZone, NgControl, MbscInputService, OnInit, ViewContainerRef } from '../frameworks/angular';
import { MbscCalbaseOptions } from '../presets/calbase';
import { MbscDatetimeBase } from './datetimebase.angular';
export declare abstract class MbscCalBase extends MbscDatetimeBase implements OnInit {
    calendarHeight: number;
    calendarWidth: number;
    calendarScroll: 'horizontal' | 'vertical';
    colors: Array<{
        start?: any;
        end?: any;
        d?: any;
        background: string;
        cssClass?: string;
    }>;
    counter: boolean;
    defaultValue: Date | Array<Date>;
    events: Array<{
        start?: any;
        end?: any;
        d?: any;
        text?: string;
        color?: string;
        background?: string;
        cssClass?: string;
    }>;
    labels: Array<{
        start?: any;
        end?: any;
        d?: any;
        text?: string;
        color?: string;
        background?: string;
        cssClass?: string;
    }>;
    marked: Array<Date | number | string | {
        d?: any;
        color?: string;
        background?: string;
        cssClass?: string;
    }>;
    months: number | 'auto';
    outerMonthChange: boolean;
    showOuterDays: boolean;
    tabs: boolean;
    weekCounter: 'year' | 'month';
    weekDays: 'full' | 'short' | 'min';
    weeks: number;
    yearChange: boolean;
    dateText: string;
    dayNamesMin: Array<string>;
    firstDay: number;
    timeText: string;
    moreEventsPluralText: string;
    moreEventsText: string;
    onTabChange: EventEmitter<{
        tab: 'calendar' | 'date' | 'time';
        inst: any;
    }>;
    onDayChange: EventEmitter<{
        date: Date;
        marked?: any;
        selected?: 'start' | 'end';
        target: HTMLElement;
        inst: any;
    }>;
    onLabelTap: EventEmitter<{
        date: Date;
        domEvent: any;
        target: HTMLElement;
        labels?: any[];
        label?: any;
        inst: any;
    }>;
    onMonthChange: EventEmitter<{
        year: number;
        month: number;
        inst: any;
    }>;
    onMonthLoading: EventEmitter<{
        year: number;
        month: number;
        inst: any;
    }>;
    onMonthLoaded: EventEmitter<{
        year: number;
        month: number;
        inst: any;
    }>;
    onPageChange: EventEmitter<{
        firstDay: Date;
        inst: any;
    }>;
    onPageLoaded: EventEmitter<{
        firstDay: Date;
        inst: any;
    }>;
    onPageLoading: EventEmitter<{
        firstDay: Date;
        inst: any;
    }>;
    onSetDate: EventEmitter<{
        date: Date;
        control?: 'calendar' | 'date' | 'time';
        inst: any;
    }>;
    inlineOptions(): MbscCalbaseOptions;
    inlineEvents(): MbscCalbaseOptions;
    constructor(initialElem: ElementRef, zone: NgZone, control: NgControl, inputService: MbscInputService, view: ViewContainerRef);
    ngOnInit(): void;
}
