import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PizzaTypesRoutingModule } from './pizza-types-routing-module';
import { PizzaTypesListComponent } from './pizza-types-list/pizza-types-list.component';
import { PizzaTypesUploadComponent } from './pizza-types-upload/pizza-types-upload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PizzaTypesAddComponent } from './pizza-types-add/pizza-types-add.component';
import { PizzaTypesEditComponent } from './pizza-types-edit/pizza-types-edit.component';


@NgModule({
  declarations: [
    PizzaTypesListComponent,
    PizzaTypesUploadComponent,
    PizzaTypesAddComponent,
    PizzaTypesEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PizzaTypesRoutingModule
  ]
})
export class PizzaTypesModule { }
