import { Component, OnInit } from '@angular/core';
import { Pizza } from '../../../models/pizza.model';
import { PizzaType } from '../../../models/pizza-type.model';
import { PizzasService } from '../../../services/pizzas.service';
import { PizzaTypesService } from '../../../services/pizza-types.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pizzas-list',
  standalone: false,
  templateUrl: './pizzas-list.component.html',
  styleUrls: ['./pizzas-list.component.css'],
})
export class PizzasListComponent implements OnInit {
  pizzas: Pizza[] = [];
  pizzaTypes: PizzaType[] = [];
  loading = false;
  totalItems = 0;
  currentPage = 1;
  pageSize = 10;

  constructor(
    private pizzasService: PizzasService,
    private pizzaTypesService: PizzaTypesService
  ) {}

  ngOnInit(): void {
    this.loadPizzaTypes();
    this.loadPizzas();
  }

  loadPizzaTypes(): void {
    this.pizzaTypesService.getAll(1, 100).subscribe({
      next: (res) => {
        this.pizzaTypes = res.items;
      },
      error: () => {
        Swal.fire('Error', 'Failed to load pizza types.', 'error');
      },
    });
  }

  loadPizzas(): void {
    this.loading = true;
    this.pizzasService.getAll(this.currentPage, this.pageSize).subscribe({
      next: (result) => {
        this.pizzas = result.items;
        this.totalItems = result.total;
        this.loading = false;
      },
      error: () => {
        Swal.fire('Error', 'Failed to load pizzas.', 'error');
        this.loading = false;
      },
    });
  }

  getPizzaTypeName(pizzaTypeCode: string): string {
    const pizzaType = this.pizzaTypes.find(
      (t) => t.pizzaTypeCode === pizzaTypeCode
    );
    return pizzaType ? pizzaType.name : 'Unknown';
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
    this.loadPizzas();
  }

  deletePizza(pizzaCode: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the pizza.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.pizzasService.delete(pizzaCode).subscribe({
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
