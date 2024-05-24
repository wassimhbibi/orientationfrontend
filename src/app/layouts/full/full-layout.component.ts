import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SidebarService } from '../../shared/sidebar/sidebar.service'

@Component({
    selector: 'app-full-layout',
    templateUrl: './full-layout.component.html',
    styleUrls: ['./full-layout.component.scss']
})

export class FullLayoutComponent implements OnInit {

    constructor( public sidebarservice: SidebarService ) {

    }
        


      toggleSidebar() {
        this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
    }
   
    getSideBarState() {
        return this.sidebarservice.getSidebarState();
    }

    ngOnInit() {
       
    }

}