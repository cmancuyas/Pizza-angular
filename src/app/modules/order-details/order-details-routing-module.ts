import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailsListComponent } from './order-details-list/order-details-list.component';
import { OrderDetailsUploadComponent } from './order-details-upload/order-details-upload.component';

const routes: Routes = [
  { path: '', component: OrderDetailsListComponent },
  { path: 'upload', component: OrderDetailsUploadComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderDetailsRoutingModule {}
