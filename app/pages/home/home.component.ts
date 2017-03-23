import {
    ViewChild, ChangeDetectorRef, OnInit, AfterViewInit,
    ChangeDetectionStrategy, Component
} from '@angular/core';

import { Observable } from "data/observable";
import { Page } from "ui/page";
import { Frame } from "ui/frame";
import { RouterExtensions } from "nativescript-angular";
import { NavigationEnd } from '@angular/router';

// drawer
import { RadSideDrawerComponent } from "nativescript-telerik-ui/sidedrawer/angular";
import { DrawerTransitionBase, PushTransition, SlideInOnTopTransition } from "nativescript-telerik-ui/sidedrawer";
import { SideDrawerType } from 'nativescript-telerik-ui/sidedrawer/angular';

import { DrawerService } from "../../services/drawer.service";

import { isAndroid, isIOS, device } from 'platform';
import { ActionItem } from 'ui/action-bar';

import { Color } from "color";
//import { TranslateService } from 'ng2-translate';

var frameModule = require("ui/frame");

@Component({
    moduleId: module.id,
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: ["home-common.css", "home.component.css"],
    changeDetection: ChangeDetectionStrategy.Default,

})
export class HomeComponent extends Observable implements OnInit, AfterViewInit {

  @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
  private _sideDrawerTransition: DrawerTransitionBase;

  private _currentNotification: string;
  private visibleMenuBtn : boolean;

  private drawer: SideDrawerType;
  //translateLoc: TranslateService;

  constructor(private routerExtensions: RouterExtensions,
                private _page: Page,
                private _frame: Frame,
                private changeDetectionRef: ChangeDetectorRef,
                public drawerService: DrawerService,
                //translate: TranslateService,
                ) {
    

    super();

    //this.translateLoc = translate;
    
    _page.on("loaded", this.onLoaded, this);

    this.visibleMenuBtn = false;

    this.setActionBarIcon(this._page);

  }

  public showMenuItem(){
  
    if (isAndroid) {
      this._page.actionBar.navigationButton.visibility = 'visible';
    } else if (isIOS) {
      
      // if the menu icon is not present add it
      let found = false;
      let actionItems = this._page.actionBar.actionItems.getItems();
      actionItems.forEach((item) => {
        if (item.icon == 'res://ic_menu_white') {
          found = true;
        }
      });

      if (!found){
        this._page.actionBar.actionItems.addItem(this.getNavigationButton());
      }
    }
  }settings_icon

  public hideMenuItem(){
    if (isAndroid) {
      this._page.actionBar.navigationButton.visibility = 'collapse';
    } else if (isIOS) {
      var actionItems = this._page.actionBar.actionItems.getItems();
      actionItems.forEach((item) => {
        this._page.actionBar.actionItems.removeItem(item);
      });
    }
  }

  public changeTitleBar(title : string){
    this._page.actionBar.title = title;
  }

  private setActionBarIcon(page: Page) {
    if (isAndroid) {
      page.actionBar.navigationButton = this.getNavigationButton();
    } else if (isIOS) {
      page.actionBar.actionItems.addItem(this.getNavigationButton());

      // to change the color of battery status/hour...
      var controller = frameModule.topmost().ios.controller;
      // get the view controller navigation item
      var navigationItem = controller.visibleViewController.navigationItem;

      var navigationBar = controller.navigationBar;
      /*  change status bar style --> UIStatusBarStyleDefault | UIStatusBarStyleLightContent | UIStatusBarStyleBlackTranslucent,
      UIStatusBarStyleBlackOpaque */
      navigationBar.barStyle = 1;
    }

    // set the bar and background color
    this._page.actionBar.backgroundColor = new Color("#D02530"); 
    this._page.actionBar.color = new Color("white");

    //this.drawer.
    //navigationBar.barStyle = 1;
  }

  private getNavigationButton() {
    let navActionItem = new ActionItem();
    //private static UIImage _normalImage = new UIImage(MptxString.ImgMenuIcon).ImageWithRenderingMode(UIImageRenderingMode.AlwaysOriginal);
    
    navActionItem.icon = 'res://ic_menu_white';  // ic_menu_white | 

    if (navActionItem.ios) {
      navActionItem.ios.position = 'left';
    }
    
    navActionItem.on('tap', this.toggleDrawer.bind(this));
    return navActionItem;
  }

  private toggleDrawer() {
    this.drawerService.drawer.toggleDrawerState();
  }
  
  navigateTo(pathToNavigate: string) {
    // change the title only if it's login page (logout) - just because when the app is started the translate lib is not ready
    this.routerExtensions.navigate([pathToNavigate], {clearHistory: true});
  }

  ngOnInit() {
    //console.log(`HomeComponent ngOnInit`);
    this.routerExtensions.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        //console.log(`got router event: NavigationEnd, toggling drawer via our drawerService`);
        this.drawerService.toggle(false);
      }
    });
  }

  ngAfterViewInit() {
    //console.log("HomeComponent ngAfterViewInit - this.drawerComponent.sideDrawer=", this.drawerComponent.sideDrawer);
    this.changeDetectionRef.detectChanges();
    this.drawerService.drawer = this.drawerComponent.sideDrawer;
    //this.drawer = this.drawerComponent.sideDrawer;
  }


  public onLoaded(args) {
      //console.log(`>>>>>>> HomeComponent onLoaded <<<<<<<<<`);
      //this._sideDrawerTransition = new PushTransition();
      if (isAndroid) {
        this._sideDrawerTransition = new SlideInOnTopTransition();
      }

      if (isIOS) {
        this._sideDrawerTransition = new PushTransition();
      }
  }

  public get sideDrawerTransition(): DrawerTransitionBase {
    return this._sideDrawerTransition;
  }

  

  

}


