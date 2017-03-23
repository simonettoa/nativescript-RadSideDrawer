import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { LoginComponent } from './pages/login/login.component';
import { SettingsComponent } from './pages/settings/settings.component';

import { HomeComponent } from './pages/home/home.component';


export const APP_ROUTES: Routes = [
    {
        path: '',
        redirectTo: '/home/login',
        pathMatch: 'full'
    },
    {
        path: "home",
        component: HomeComponent,
            children: [
                {path: "login", component: LoginComponent},
                {path: 'settings', component: SettingsComponent }
            ]
    },

];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(APP_ROUTES)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }