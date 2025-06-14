import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PizzaTypesListComponent } from './pizza-types-list/pizza-types-list.component';
import { PizzaTypesUploadComponent } from './pizza-types-upload/pizza-types-upload.component';
import { PizzaTypesAddComponent } from './pizza-types-add/pizza-types-add.component';
import { PizzaTypesEditComponent } from './pizza-types-edit/pizza-types-edit.component';

const routes: Routes = [
  { path: '', component: PizzaTypesListComponent },
  { path: 'add', component: PizzaTypesAddComponent },
  { path: 'edit/:pizzaTypeCode', component: PizzaTypesEditComponent },
  { path: 'upload', component: PizzaTypesUploadComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PizzaTypesRoutingModule {}
