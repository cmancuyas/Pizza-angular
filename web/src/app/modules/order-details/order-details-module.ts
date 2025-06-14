import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderDetailsRoutingModule } from './order-details-routing-module';
import { OrderDetailsListComponent } from './order-details-list/order-details-list.component';
import { OrderDetailsUploadComponent } from './order-details-upload/order-details-upload.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OrderDetailsListComponent,
    OrderDetailsUploadComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OrderDetailsRoutingModule
  ]
})
export class OrderDetailsModule { }
