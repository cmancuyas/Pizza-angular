import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Order } from '../../../models/order.model';
import { OrdersService } from '../../../services/orders.service';

@Component({
  selector: 'app-orders-list',
  standalone: false,
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css'],
})
export class OrdersListComponent implements OnInit {
  orders: Order[] = [];
  loading = false;
  totalItems = 0;
  currentPage = 1;
  pageSize = 10;

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading = true;
    this.ordersService.getAll(this.currentPage, this.pageSize).subscribe({
      next: (result) => {
        this.orders = result.items;
        this.totalItems = result.total;
        this.loading = false;
      },
      error: () => {
        Swal.fire('Error', 'Failed to load orders.', 'error');
        this.loading = false;
      },
    });
  }

  get pageCount(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.pageCount }, (_, i) => i + 1);
  }

  onPageChange(page: number): void {
    if (page < 1 || page > this.pageCount) return;
    this.currentPage = page;
    this.loadOrders();
  }

  deleteOrder(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the order.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
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
          },
        });
      }
    });
  }
}
