import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing-module';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrdersUploadComponent } from './orders-upload/orders-upload.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OrdersListComponent,
    OrdersUploadComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OrdersRoutingModule
  ]
})
export class OrdersModule { }
