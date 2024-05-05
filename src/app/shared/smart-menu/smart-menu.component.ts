import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AppService } from 'src/app/app-service.service';

@Component({
  selector: 'app-smart-menu',
  templateUrl: './smart-menu.component.html',
  styleUrls: ['./smart-menu.component.css'],

})

export class SmartMenuComponent {
  @Output() FunctionsAddElement = new EventEmitter<any>();
  @Input() btnsMenu!: any;
  @Input() fieldOptions!: any;
  serialNumber!: Number
  selectedField = 'בחר';
  showFieldDropdown = false;
  @ViewChild('submenu') submenu!: ElementRef;
  private activeDropdown: string | null = null;
  showNavBar:any

  constructor(private appService:AppService) { 
    this.appService.getNavBar().subscribe(res => {
      this.showNavBar = res ? res : false;
    })
  }

  functions(val: any) {
    debugger
    if (val != "field") {
      this.FunctionsAddElement.emit(val);
    }
    else {
      this.FunctionsAddElement.emit(this.selectedField);
      this.selectedField = ""
    }
  }

  isBtnField(btnFiledType: any) {
    debugger
    if (btnFiledType == "field") {
      if (this.showFieldDropdown == false) {
        this.showFieldDropdown = true;
      }
      else {
        this.showFieldDropdown = false
      }
      return false;
    }
    else {
      this.showFieldDropdown = false
      return true;
    }
  }


  toggleDropdown(type: string) {
    if (this.isActive(type)) {
      this.activeDropdown = null;
    } else {
      this.activeDropdown = type;
    }
  }

  isActive(type: string): boolean {
    return this.activeDropdown === type;
  }
}
