import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PizzasRoutingModule } from './pizzas-routing-module';
import { PizzasListComponent } from './pizzas-list/pizzas-list.component';
import { PizzasUploadComponent } from './pizzas-upload/pizzas-upload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PizzasAddComponent } from './pizzas-add/pizzas-add.component';
import { PizzasEditComponent } from './pizzas-edit/pizzas-edit.component';


@NgModule({
  declarations: [
    PizzasListComponent,
    PizzasUploadComponent,
    PizzasAddComponent,
    PizzasEditComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PizzasRoutingModule
  ]
})
export class PizzasModule { }
