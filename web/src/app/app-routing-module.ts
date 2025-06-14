import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'pizza-types',
    loadChildren: () =>
      import('./modules/pizza-types/pizza-types-module').then(
        (m) => m.PizzaTypesModule
      ),
  },
  {
    path: 'pizzas',
    loadChildren: () =>
      import('./modules/pizzas/pizzas-module').then((m) => m.PizzasModule),
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./modules/orders/orders-module').then((m) => m.OrdersModule),
  },
  {
    path: 'order-details',
    loadChildren: () =>
      import('./modules/order-details/order-details-module').then(
        (m) => m.OrderDetailsModule
      ),
  },
  { path: '', redirectTo: '/pizza-types', pathMatch: 'full' },
  { path: '**', redirectTo: '/pizza-types' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
