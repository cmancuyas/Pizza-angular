import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { OrdersService } from '../../../services/orders.service';
import { PizzasService } from '../../../services/pizzas.service';
import { Pizza } from '../../../models/pizza.model';

import { Order } from '../../../models/order.model';
import { OrderUpdateDto } from '../../../models/DTOs/order-detail-update-dto.model';

@Component({
  selector: 'app-orders-edit',
  standalone: false,
  templateUrl: './orders-edit.component.html',
  styleUrls: ['./orders-edit.component.css'],
})
export class OrdersEditComponent implements OnInit {
  orderId: number = 0;
  order: OrderUpdateDto = {
    date: '',
    time: '',
    orderDetails: [],
  };
  pizzas: Pizza[] = [];
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ordersService: OrdersService,
    private pizzasService: PizzasService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.orderId = idParam ? +idParam : 0;

    if (!this.orderId) {
      Swal.fire('Error', 'Invalid order ID.', 'error');
      this.router.navigate(['/orders']);
      return;
    }

    this.loading = true;

    this.pizzasService.getAll(1, 100).subscribe({
      next: (res) => (this.pizzas = res.items),
      error: () => Swal.fire('Error', 'Failed to load pizzas.', 'error'),
    });

    this.ordersService.getById(this.orderId).subscribe({
      next: (o: Order) => {
        this.order = {
          date: o.date,
          time: o.time,
          orderDetails: o.orderDetails.map((d) => ({
            pizzaCode: d.pizza?.pizzaCode ?? '',
            quantity: d.quantity,
          })),
        };
        this.loading = false;
      },
      error: () => {
        Swal.fire('Error', 'Order not found.', 'error');
        this.router.navigate(['/orders']);
      },
    });
  }

  addOrderDetailRow(): void {
    this.order.orderDetails.push({ pizzaCode: '', quantity: 1 });
  }

  removeOrderDetailRow(index: number): void {
    this.order.orderDetails.splice(index, 1);
  }

  saveOrder(): void {
    if (
      !this.order.date ||
      !this.order.time ||
      this.order.orderDetails.length === 0
    ) {
      Swal.fire('Validation', 'Please complete all fields.', 'warning');
      return;
    }

    this.loading = true;

    this.ordersService.update(this.orderId, this.order).subscribe({
      next: () => {
        Swal.fire('Success', 'Order updated!', 'success');
        this.router.navigate(['/orders']);
      },
      error: () => {
        Swal.fire('Error', 'Could not update order.', 'error');
        this.loading = false;
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/orders']);
  }
}
