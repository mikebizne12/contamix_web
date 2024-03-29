import { ElementRef, NgZone, QueryList, MbscOptionsService, AfterViewInit, Injector, MbscRouterToken, ModuleWithProviders } from './frameworks/angular';
import { Navigation } from './classes/navigation';
import { MbscNotifyItemService } from './classes/scrollview-base.angular';
import { MbscNavItemBase, MbscNavigationBase } from './classes/navigation-base.angular';
import { MbscNavOptions } from './classes/navigation';
export { MbscNavOptions };
export declare class MbscNavItem extends MbscNavItemBase {
    inj: Injector;
    _instance: Navigation;
    initialBadge: string;
    badge: string;
    routerLink: any;
    routerLinkActiveOptions: {
        exact: boolean;
    };
    injectedRouter: any;
    activatedRoute: any;
    debounceHandler: any;
    constructor(notifyItemService: MbscNotifyItemService, elem: ElementRef, inj: Injector, routerToken: MbscRouterToken);
    checkSelected(): void;
}
export declare class MbscNav extends MbscNavigationBase implements AfterViewInit {
    optionService: MbscOptionsService;
    _instance: Navigation;
    type: 'bottom' | 'hamburger' | 'tab';
    select: 'single';
    moreText: string;
    moreIcon: string;
    menuText: string;
    menuIcon: string;
    inlineOptions(): MbscNavOptions;
    constructor(initialElem: ElementRef, zone: NgZone, notifyItemService: MbscNotifyItemService, optionService: MbscOptionsService);
    items: QueryList<MbscNavItemBase>;
    ngAfterViewInit(): void;
}
export declare class MbscBottomNav extends MbscNav {
    constructor(initialElem: ElementRef, zone: NgZone, navItemService: MbscNotifyItemService, optionService: MbscOptionsService);
}
export declare class MbscHamburgerNav extends MbscNav {
    constructor(initialElem: ElementRef, zone: NgZone, navItemService: MbscNotifyItemService, optionService: MbscOptionsService);
}
export declare class MbscTabNav extends MbscNav {
    constructor(initialElem: ElementRef, zone: NgZone, navItemService: MbscNotifyItemService, optionService: MbscOptionsService);
}
export declare class MbscNavigationModule {
    static forRoot(config: {
        angularRouter: any;
    }): ModuleWithProviders;
}
