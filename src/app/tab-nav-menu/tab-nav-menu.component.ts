import { Component, Input, OnInit } from '@angular/core';
import { AppService } from '../app-service.service';

@Component({
  selector: 'app-tab-nav-menu',
  templateUrl: './tab-nav-menu.component.html',
  styleUrls: ['./tab-nav-menu.component.scss']
})
export class TabNavMenuComponent implements OnInit {
  @Input() tabLink:any 
  showNavBar:any

  constructor(private appService:AppService) { 
    this.appService.getNavBar().subscribe(res => {
      this.showNavBar = res ? res : false;
    })
  }

  ngOnInit(): void {
  }

  isShowNavBar(isShow:any){
    debugger;
    this.appService.setNavBar(Boolean(isShow))
  }
}
