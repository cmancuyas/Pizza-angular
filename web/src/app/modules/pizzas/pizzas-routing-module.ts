import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PizzasListComponent } from './pizzas-list/pizzas-list.component';
import { PizzasUploadComponent } from './pizzas-upload/pizzas-upload.component';

const routes: Routes = [
  { path: '', component: PizzasListComponent }, // /pizzas
  { path: 'upload', component: PizzasUploadComponent }, // /pizzas/upload
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PizzasRoutingModule {}
