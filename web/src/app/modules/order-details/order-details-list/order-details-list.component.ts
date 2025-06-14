import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { OrderDetail } from '../../../models/order-details.model';
import { OrderDetailsService } from '../../../services/order-details.service';

@Component({
  selector: 'app-order-details-list',
  standalone: false,
  templateUrl: './order-details-list.component.html',
  styleUrl: './order-details-list.component.css'
})
export class OrderDetailsListComponent {
  orderDetails: OrderDetail[] = [];
  loading = false;

  constructor(private orderDetailsService: OrderDetailsService) {}

  ngOnInit(): void {
    this.loadOrderDetails();
  }

  loadOrderDetails(): void {
    this.loading = true;
    this.orderDetailsService.getAll().subscribe({
      next: data => {
        this.orderDetails = data;
        this.loading = false;
      },
      error: () => {
        Swal.fire('Error', 'Failed to load order details.', 'error');
        this.loading = false;
      }
    });
  }

  deleteOrderDetail(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the order detail.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete'
    }).then(result => {
      if (result.isConfirmed) {
        this.loading = true;
        this.orderDetailsService.delete(id).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'Order detail deleted.', 'success');
            this.loadOrderDetails();
          },
          error: () => {
            Swal.fire('Error', 'Could not delete order detail.', 'error');
            this.loading = false;
          }
        });
      }
    });
  }
}
