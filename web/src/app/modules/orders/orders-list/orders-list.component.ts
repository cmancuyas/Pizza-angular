import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Order } from '../../../models/order.model';
import { OrdersService } from '../../../services/orders.service';

@Component({
  selector: 'app-orders-list',
  standalone: false,
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.css'
})
export class OrdersListComponent {
orders: Order[] = [];
  loading = false;

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading = true;
    this.ordersService.getAll().subscribe({
      next: data => {
        this.orders = data;
        this.loading = false;
      },
      error: () => {
        Swal.fire('Error', 'Failed to load orders.', 'error');
        this.loading = false;
      }
    });
  }

  deleteOrder(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the order.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete'
    }).then(result => {
      if (result.isConfirmed) {
        this.loading = true;
        this.ordersService.delete(id).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'Order deleted.', 'success');
            this.loadOrders();
          },
          error: () => {
            Swal.fire('Error', 'Could not delete order.', 'error');
            this.loading = false;
          }
        });
      }
    });
  }
}
