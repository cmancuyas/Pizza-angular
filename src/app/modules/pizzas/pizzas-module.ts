import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PizzasRoutingModule } from './pizzas-routing-module';
import { PizzasListComponent } from './pizzas-list/pizzas-list.component';
import { PizzasUploadComponent } from './pizzas-upload/pizzas-upload.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PizzasListComponent,
    PizzasUploadComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PizzasRoutingModule
  ]
})
export class PizzasModule { }
