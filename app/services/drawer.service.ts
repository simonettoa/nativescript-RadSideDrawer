import {Injectable} from '@angular/core';
import {SideDrawerType} from 'nativescript-telerik-ui/sidedrawer/angular';

@Injectable()
export class DrawerService {

  public drawer: SideDrawerType;

    public toggle(force?: boolean) {

        if (this.drawer) {
            if (typeof force !== 'undefined') {
                if (force === false) {
                    this.drawer.closeDrawer();
                }
            } else {
                //console.log(`DrawerService.toggle called with drawer:`, this.drawer);
                this.drawer.toggleDrawerState();
            }
        } else {
            //console.log("DrawerService.toggle: this.drawer was undefined");
        }
    }

    private titleBar: string = "! test init title !";
    private actionItemVisibility: boolean = true;

    // based on the current page set the title
    public setTitleBar(newTitle){
        this.titleBar = newTitle;
        if (newTitle == 'LOGIN PAGE'){
            this.actionItemVisibility = false;
        } else {
            this.actionItemVisibility = true;
        }
    }
}