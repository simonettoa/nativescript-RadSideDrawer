import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SettingsComponent } from './pages/settings/settings.component';

import { DrawerService } from "./services/drawer.service";

import { SIDEDRAWER_DIRECTIVES } from "nativescript-telerik-ui/sidedrawer/angular";

export const APP_COMPONENTS: any[] = [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SettingsComponent,
];

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule
    ],
    exports: [
        SIDEDRAWER_DIRECTIVES,
        NativeScriptModule,
    ],
    declarations: [
        APP_COMPONENTS,
        SIDEDRAWER_DIRECTIVES
    ],
    providers: [
        DrawerService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
