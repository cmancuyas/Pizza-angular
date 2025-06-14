import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrdersUploadComponent } from './orders-upload/orders-upload.component';
import { OrdersAddComponent } from './orders-add/orders-add.component';
import { OrdersEditComponent } from './orders-edit/orders-edit.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

const routes: Routes = [
  { path: '', component: OrdersListComponent },
  { path: 'add', component: OrdersAddComponent },
  { path: 'edit/:id', component: OrdersEditComponent },
  { path: 'details/:id', component: OrderDetailsComponent },
  { path: 'upload', component: OrdersUploadComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
