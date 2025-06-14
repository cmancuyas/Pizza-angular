import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PizzasListComponent } from './pizzas-list/pizzas-list.component';
import { PizzasUploadComponent } from './pizzas-upload/pizzas-upload.component';
import { PizzasAddComponent } from './pizzas-add/pizzas-add.component';
import { PizzasEditComponent } from './pizzas-edit/pizzas-edit.component';

const routes: Routes = [
  { path: '', component: PizzasListComponent },
  { path: 'add', component: PizzasAddComponent },
  { path: 'edit/:pizzaCode', component: PizzasEditComponent },
  { path: 'upload', component: PizzasUploadComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PizzasRoutingModule {}
