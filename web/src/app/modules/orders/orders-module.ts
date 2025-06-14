import { OrderDetailsComponent } from './order-details/order-details.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing-module';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrdersUploadComponent } from './orders-upload/orders-upload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrdersAddComponent } from './orders-add/orders-add.component';
import { OrdersEditComponent } from './orders-edit/orders-edit.component';

@NgModule({
  declarations: [
    OrdersListComponent,
    OrdersUploadComponent,
    OrdersAddComponent,
    OrdersEditComponent,
    OrderDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OrdersRoutingModule
  ]
})
export class OrdersModule { }
