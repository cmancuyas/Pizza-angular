import { Component } from '@angular/core';
import { Pizza } from '../../../models/pizza.model';
import { PizzasService } from '../../../services/pizzas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pizzas-list',
  standalone: false,
  templateUrl: './pizzas-list.component.html',
  styleUrl: './pizzas-list.component.css',
})
export class PizzasListComponent {
  pizzas: Pizza[] = [];
  loading = false;

  constructor(private pizzasService: PizzasService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadPizzas();
  }

  loadPizzas(): void {
    this.loading = true;
    this.pizzasService.getAll().subscribe({
      next: (data) => {
        this.pizzas = data;
        this.loading = false;
      },
      error: (err) => {
        Swal.fire('Error', 'Failed to load pizzas.', 'error');
        this.loading = false;
      },
    });
  }

  deletePizza(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the pizza.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.pizzasService.delete(id).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'Pizza deleted.', 'success');
            this.loadPizzas();
          },
          error: () => {
            Swal.fire('Error', 'Could not delete pizza.', 'error');
            this.loading = false;
          },
        });
      }
    });
  }
}
