import { OrdersService } from './../../../services/orders.service';
import { PizzasService } from './../../../services/pizzas.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Pizza } from '../../../models/pizza.model';


// Fixed DTOs to match backend
interface OrderDetailCreateDto {
  pizzaCode: string;
  quantity: number;
}
interface OrderCreateDto {
  date: string;
  time: string;
  orderDetails: OrderDetailCreateDto[];
}

@Component({
  selector: 'app-orders-add',
  standalone: false,
  templateUrl: './orders-add.component.html',
  styleUrls: ['./orders-add.component.css'],
})
export class OrdersAddComponent implements OnInit {
  order: OrderCreateDto = {
    date: '',
    time: '',
    orderDetails: [{ pizzaCode: '', quantity: 1 }],
  };
  pizzas: Pizza[] = [];
  loading = false;

  constructor(
    private ordersService: OrdersService,
    private pizzasService: PizzasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pizzasService.getAll(1, 100).subscribe({
      next: (res) => (this.pizzas = res.items),
      error: () => Swal.fire('Error', 'Failed to load pizzas.', 'error'),
    });

    const now = new Date();
    this.order.date = now.toISOString().slice(0, 10); // yyyy-MM-dd
    this.order.time = now.toTimeString().slice(0, 5); // HH:mm
  }

  addOrderDetailRow(): void {
    this.order.orderDetails.push({ pizzaCode: '', quantity: 1 });
  }

  removeOrderDetailRow(index: number): void {
    this.order.orderDetails.splice(index, 1);
  }

  saveOrder(): void {
    if (!this.order.date || !this.order.time) {
      Swal.fire('Error', 'Date and time are required.', 'error');
      return;
    }
    if (this.order.orderDetails.length === 0) {
      Swal.fire('Error', 'Add at least one pizza to the order.', 'error');
      return;
    }

    for (const detail of this.order.orderDetails) {
      if (!detail.pizzaCode || detail.quantity < 1) {
        Swal.fire('Error', 'All pizzas and quantities are required.', 'error');
        return;
      }
    }

    this.loading = true;
    this.ordersService.create(this.order).subscribe({
      next: () => {
        Swal.fire('Success', 'Order added!', 'success');
        this.router.navigate(['/orders']);
      },
      error: () => {
        Swal.fire('Error', 'Could not add order.', 'error');
        this.loading = false;
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/orders']);
  }
}
