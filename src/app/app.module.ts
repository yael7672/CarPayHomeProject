import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { SmartCardComponent } from './shared/smart-card/smart-card.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SmartTableComponent } from './shared/smart-table/smart-table.component';
import { MenuComponent } from './menu/menu.component';
import { PopUpComponent } from './pop-up/pop-up.component';
import { DynamicFormBuilderComponent } from './dynamic-form-builder/dynamic-form-builder.component';
import { DraggableDirective } from './draggable.directive';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TabNavMenuComponent } from './tab-nav-menu/tab-nav-menu.component';
import {  NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChangePropertiesComponent } from './change-properties/change-properties.component';
import { AppRoutingModule } from './app-routing.module';
import { AddElementComponent } from './add-element/add-element.component';
import { SmartMenuComponent } from './shared/smart-menu/smart-menu.component';
import { INgxSelectOptions, NgxSelectModule } from 'ngx-select-ex';
const CustomSelectOptions: INgxSelectOptions = { 
  optionValueField: 'elementValue',
  optionTextField: 'elementText'
}

@NgModule({
  declarations: [ 
    MenuComponent,
    AppComponent,
    SmartCardComponent,
    SmartTableComponent,
    PopUpComponent,
    DynamicFormBuilderComponent,
    DraggableDirective,
    TabNavMenuComponent,
    ChangePropertiesComponent,
    AddElementComponent,
    SmartMenuComponent
    // DashboardComponent,
    // LoginComponent,
  ],
  imports: [  
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    NgxPaginationModule,
    HttpClientModule,
   FormsModule,
    // AutocompleteLibModule,
    DragDropModule,
     NgbModule,
     NgxSelectModule.forRoot(CustomSelectOptions),

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
