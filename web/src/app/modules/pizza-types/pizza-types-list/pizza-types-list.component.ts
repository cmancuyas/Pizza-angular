import { PizzaTypesService } from './../../../services/pizza-types.service';
import { Component } from '@angular/core';
import { PizzaType } from '../../../models/pizza-type.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pizza-types-list',
  standalone: false,
  templateUrl: './pizza-types-list.component.html',
  styleUrl: './pizza-types-list.component.css'
})
export class PizzaTypesListComponent {
  pizzaTypes: PizzaType[] = [];

  loading = false;

  constructor(private pizzaTypesService: PizzaTypesService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadPizzaTypes();
  }

  loadPizzaTypes():void{
    this.loading = true;

    this.pizzaTypesService.getAll().subscribe({
      next: data=>{
        this.pizzaTypes = data;
        this.loading = false;
      },

      error: err => {
        Swal.fire('Error', 'Failed to load pizza types.', 'error')
        this.loading = false;
      }

    })
  }

  deletePizzaType(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the pizza type.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete'
    }).then(result => {
      if (result.isConfirmed) {
        this.loading = true;
        this.pizzaTypesService.delete(id).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'Pizza type deleted.', 'success');
            this.loadPizzaTypes();
          },
          error: () => {
            Swal.fire('Error', 'Could not delete pizza type.', 'error');
            this.loading = false;
          }
        });
      }
    });

  }
}
