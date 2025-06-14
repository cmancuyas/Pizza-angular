import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PizzaTypesRoutingModule } from './pizza-types-routing-module';
import { PizzaTypesListComponent } from './pizza-types-list/pizza-types-list.component';
import { PizzaTypesUploadComponent } from './pizza-types-upload/pizza-types-upload.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PizzaTypesListComponent,
    PizzaTypesUploadComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PizzaTypesRoutingModule
  ]
})
export class PizzaTypesModule { }
