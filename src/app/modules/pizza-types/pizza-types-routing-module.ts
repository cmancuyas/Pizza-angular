import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PizzaTypesListComponent } from './pizza-types-list/pizza-types-list.component';
import { PizzaTypesUploadComponent } from './pizza-types-upload/pizza-types-upload.component';

const routes: Routes = [
  { path: '', component: PizzaTypesListComponent },
  { path: 'upload', component: PizzaTypesUploadComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PizzaTypesRoutingModule {}
