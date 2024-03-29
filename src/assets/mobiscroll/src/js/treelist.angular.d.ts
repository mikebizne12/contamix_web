import { MbscScrollerBase, OnInit, EventEmitter, ElementRef, NgZone, NgControl, MbscInputService, MbscOptionsService, ViewContainerRef } from './frameworks/angular';
import { Treelist, MbscTreelistOptions } from './presets/treelist';
export { MbscTreelistOptions };
export declare class MbscTreelist extends MbscScrollerBase implements OnInit {
    optionService: MbscOptionsService;
    _instance: Treelist;
    defaultValue: Array<number>;
    inputClass: string;
    invalid: Array<any>;
    labels: Array<string>;
    placeholder: string;
    showInput: boolean;
    data: Array<any>;
    inlineOptions(): MbscTreelistOptions;
    options: MbscTreelistOptions;
    target: any;
    value: string;
    onChangeEmitter: EventEmitter<string>;
    constructor(initialElement: ElementRef, zone: NgZone, control: NgControl, inputService: MbscInputService, optionService: MbscOptionsService, view: ViewContainerRef);
    ngAfterViewInit(): void;
    refreshData(newData: any): void;
    setNewValue(v: any): void;
    ngOnInit(): void;
}
export declare class MbscTreelistComponent extends MbscTreelist {
    inputIcon: string;
    iconAlign: 'left' | 'right';
    name: string;
    error: boolean;
    errorMessage: string;
    options: MbscTreelistOptions;
    data: Array<any>;
    placeholder: string;
    showInput: boolean;
    constructor(initialElem: ElementRef, zone: NgZone, control: NgControl, inputService: MbscInputService, optionService: MbscOptionsService);
    ngAfterViewInit(): void;
}
export declare class MbscTreelistModule {
}
