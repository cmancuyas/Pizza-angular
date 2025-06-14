import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrdersUploadComponent } from './orders-upload/orders-upload.component';

const routes: Routes = [
  { path: '', component: OrdersListComponent },
  { path: 'upload', component: OrdersUploadComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
