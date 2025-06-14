import { Component, OnInit } from '@angular/core';
import { PizzaTypesService } from '../../../services/pizza-types.service';
import { PizzaType } from '../../../models/pizza-type.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pizza-types-list',
  standalone: false,
  templateUrl: './pizza-types-list.component.html',
  styleUrls: ['./pizza-types-list.component.css'],
})
export class PizzaTypesListComponent implements OnInit {
  pizzaTypes: PizzaType[] = [];
  loading = false;

  currentPage = 1;
  pageSize = 10;
  totalItems = 0;

  // For Add/Edit
  formVisible = false;
  formMode: 'add' | 'edit' = 'add';
  formPizzaType: PizzaType = {
    id: 0,
    pizzaTypeCode: '', // ✅ updated
    name: '',
    category: '',
    ingredients: '',
  };
  Math: any = Math;

  constructor(private pizzaTypesService: PizzaTypesService) {}

  ngOnInit(): void {
    this.loadPizzaTypes();
  }

  loadPizzaTypes(): void {
    this.loading = true;
    this.pizzaTypesService.getAll(this.currentPage, this.pageSize).subscribe({
      next: (result) => {
        this.pizzaTypes = result.items;
        this.totalItems = result.total;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        Swal.fire('Error', 'Could not load pizza types.', 'error');
      },
    });
  }

  onPageChange(page: number): void {
    if (page < 1 || page > Math.ceil(this.totalItems / this.pageSize)) return;
    this.currentPage = page;
    this.loadPizzaTypes();
  }

  openAddForm(): void {
    this.formMode = 'add';
    this.formPizzaType = {
      id: 0,
      pizzaTypeCode: '', // ✅ updated
      name: '',
      category: '',
      ingredients: '',
    };
    this.formVisible = true;
  }

  openEditForm(pizzaType: PizzaType): void {
    this.formMode = 'edit';
    this.formPizzaType = { ...pizzaType };
    this.formVisible = true;
  }

  savePizzaType(): void {
    this.loading = true;
    if (this.formMode === 'add') {
      this.pizzaTypesService.add(this.formPizzaType).subscribe({
        next: () => {
          Swal.fire('Success', 'Pizza type added!', 'success');
          this.loadPizzaTypes();
          this.formVisible = false;
          this.loading = false;
        },
        error: () => {
          Swal.fire('Error', 'Could not add pizza type.', 'error');
          this.loading = false;
        },
      });
    } else if (this.formMode === 'edit') {
      this.pizzaTypesService
        .update(this.formPizzaType.pizzaTypeCode, this.formPizzaType)
        .subscribe({
          next: () => {
            Swal.fire('Success', 'Pizza type updated!', 'success');
            this.loadPizzaTypes();
            this.formVisible = false;
            this.loading = false;
          },
          error: () => {
            Swal.fire('Error', 'Could not update pizza type.', 'error');
            this.loading = false;
          },
        });
    }
  }

  deletePizzaType(pizzaTypeCode: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the pizza type.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.pizzaTypesService.delete(pizzaTypeCode).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'Pizza type deleted.', 'success');
            this.loadPizzaTypes();
          },
          error: () => {
            Swal.fire('Error', 'Could not delete pizza type.', 'error');
            this.loading = false;
          },
        });
      }
    });
  }

  cancelForm(): void {
    this.formVisible = false;
  }
}
