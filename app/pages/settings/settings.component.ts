
import { Component, OnInit, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import dialogs = require("ui/dialogs");
import { Observable } from "data/observable";

import { HomeComponent } from "../home/home.component";
import { DrawerService } from "../../services/drawer.service";

//import { TranslateService } from 'ng2-translate';

@Component({
		moduleId: module.id,
    selector: "settings",
    templateUrl: "settings.component.html",
    //styleUrls: ["settings.css", "settings-common.css"],
		changeDetection: ChangeDetectionStrategy.Default
})
export class SettingsComponent extends Observable implements OnInit {

  homeCompLoc : HomeComponent;
  //translateLoc: TranslateService;

  constructor(private routerExtensions: RouterExtensions,
              private changeDetectionRef: ChangeDetectorRef, 
              public drawerService: DrawerService,
              homeComp : HomeComponent,
              //translate: TranslateService,
              ) {
		super();

    // init something
    this.homeCompLoc = homeComp;
    //this.translateLoc = translate;		
    
    
  }
  	
	ngOnInit() {

    this.homeCompLoc.showMenuItem();

    this.homeCompLoc.changeTitleBar("SETTINGS");
  }

  logoutUser(){

		// stop the background services
		//this.homeCompLoc.startStopBackgroundService(false);

		this.homeCompLoc.navigateTo("/home/login");

		// stop the background services

		//this.routerExtensions.navigate(["/home/login"], {clearHistory: true});
	}

  changelanguageTest(){

    //this.translateLoc.use('it');

  }


}