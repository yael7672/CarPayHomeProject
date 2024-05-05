import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ChangePropertiesComponent } from './change-properties/change-properties.component';
import { DynamicFormBuilderComponent } from './dynamic-form-builder/dynamic-form-builder.component';
import { AddElementComponent } from './add-element/add-element.component';
import { SmartMenuComponent } from './shared/smart-menu/smart-menu.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
 { path: '', component: MenuComponent },
];





@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
