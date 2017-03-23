import {
    ViewChild,
    ElementRef,
    OnInit,
    AfterViewInit,
    OnDestroy,
    Component,
    ChangeDetectionStrategy
} from "@angular/core";
import { Page } from "ui/page";
import { Color } from "color";
import { View } from "ui/core/view";
import { TextField } from "ui/text-field";
import { Animation } from "ui/animation";

import {DrawerService} from "../../services/drawer.service";
import {RouterExtensions} from "nativescript-angular";

import { HomeComponent } from "../home/home.component";

import { isAndroid, isIOS, device } from 'platform';
import activityIndicatorModule = require("ui/activity-indicator");

//import { TranslateService } from 'ng2-translate';

@Component({
    moduleId: module.id,
    selector: "login",
    templateUrl: "login.component.html",
    styleUrls: ["login-common.css", "login.component.css"],
    changeDetection: ChangeDetectionStrategy.Default,
    //providers: [ TruckMeApi ]
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {

  homeCompLoc : HomeComponent;
  isAccessing = false;
  isBtnLoginEnabled = false;
  //translateLoc: TranslateService;
  isLoggingIn = true;

  @ViewChild("mainContainer") mainContainer: ElementRef;
  @ViewChild("formControls") formControls: ElementRef;
  @ViewChild("company") company: ElementRef;
  @ViewChild("username") username: ElementRef;
  @ViewChild("password") password: ElementRef;

  constructor(private routerExtensions: RouterExtensions,
              public drawerService: DrawerService,
              private page: Page,
              //private translate: TranslateService,
              private homeComp : HomeComponent,
              //private database: Database,
              //private truckMe: TruckMeApi
              ){

      //this.gf = new GenFunctions();
      //this.translateLoc = translate;

      this.homeCompLoc = homeComp;
      //this.user = new User(-1, "default - ios", "default  - mptx", "passa", "en", "***", 2, "783B275C-911D-49AA-9AF7-98770C32D7CC", "v0", "b0");

    }

  ngOnInit() {
    //console.log("ngOnInit");
    // the database load process is asynchronous, we really have to wait a moment before we can start using the database
    setTimeout(() => {
        this.getDataFromLocalDb();
    }, 250);
  }

  getDataFromLocalDb(){

    this.changeTitleBasedOnLng();

  }

  ngAfterViewInit(): void {
    //console.log("ngAfterViewInit");
    
    this.homeCompLoc.hideMenuItem();
    this.showMainContent();
    
    //this.getHomeApi();   
  }

  changeTitleBasedOnLng(){
    setTimeout(() => {
        this.homeCompLoc.changeTitleBar("LOGIN PAGE");
    }, 150);
  }


  getHomeApi(){

  }

  getAuthApi(){

  }


  getRealAuthorization(){

  }


  ngOnDestroy(): void {
    console.log("ngOnDestroy");
  }  

  focusUserName() {
    this.username.nativeElement.focus();
  }

  focusPassword() {
    this.password.nativeElement.focus();
  }

  navigateTo(pathToNavigate: string) {

    // just the first start, after the login ok start also the background service
    //this.homeCompLoc.startStopBackgroundService(true);
    //this.homeCompLoc.backgroundService();

    console.log("navigating to:", pathToNavigate);
    this.routerExtensions.navigate([pathToNavigate], {clearHistory: true});
  }

  login() {
      //this.getAuthApi();

      // activate the activity-indicator and disable the login button 
      //this.isAccessing = true;
      //this.isBtnLoginEnabled = false;

      setTimeout(() => {
          //this.getRealAuthorization();  
          
          // 'goto' listVehicles page
          this.navigateTo('/home/settings');
      }, 500);
  }

  toggleDisplay() {
    this.isLoggingIn = !this.isLoggingIn;
    this.setTextFieldColors();
    let mainContainer = <View>this.mainContainer.nativeElement;
    mainContainer.animate({
        backgroundColor: this.isLoggingIn ? new Color("white") : new Color("#301217"),
        duration: 200
    });
  }

  showMainContent() {
    let mainContainer = <View>this.mainContainer.nativeElement;
    let formControls = <View>this.formControls.nativeElement;
    let animations = [];

    // Fade out the initial content over one half second

    mainContainer.style.visibility = "visible";

    // Fade in the main container and logo over one half second.
    animations.push({target: mainContainer, opacity: 1, duration: 500});

    // Slide up the form controls and sign up container.
    animations.push({target: formControls, translate: {x: 0, y: 0}, opacity: 1, delay: 650, duration: 150});

    // Kick off the animation queue
    new Animation(animations, false).play();
  }

  startBackgroundAnimation(background) {
    background.animate({
      scale: {x: 1.0, y: 1.0},
      duration: 10000
    });
  }

  setTextFieldColors() {
    let companyTextField = <TextField>this.company.nativeElement;
    let passwordTextField = <TextField>this.password.nativeElement;

    let mainTextColor = new Color(this.isLoggingIn ? "black" : "#C4AFB4");
    companyTextField.color = mainTextColor;
    passwordTextField.color = mainTextColor;

  }


  controlEnableBtn(){
    // set a wait time because the text change is immediatly so the last event wasn't see from the corresponding texfield
    setTimeout(() => {
      this.isBtnLoginEnabled = true;
      /*
      if(this.user.UserName.length > 0 && this.user.Company.length > 0 && this.user.Password.length > 0 ){
          this.isBtnLoginEnabled = true;
          //console.log('************************ passed true | ' + this.user.UserName + ' | '+ this.user.Company + ' | ' + this.user.Password);
      } else {
          this.isBtnLoginEnabled = false;
          //console.log('************************ passed false');
      }
      */
    }, 100);
  }

}