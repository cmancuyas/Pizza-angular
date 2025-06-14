import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PizzaType } from '../../../models/pizza-type.model';
import { PizzaTypesService } from '../../../services/pizza-types.service';

@Component({
  selector: 'app-pizza-types-add',
  standalone: false,
  templateUrl: './pizza-types-add.component.html',
  styleUrls: ['./pizza-types-add.component.css']
})
export class PizzaTypesAddComponent {
  pizzaType: PizzaType = {
    id: 0,
    pizzaTypeCode: '',   // ✅ renamed
    name: '',
    category: '',
    ingredients: ''
  };
  loading = false;

  constructor(
    private pizzaTypesService: PizzaTypesService,
    private router: Router
  ) {}

  savePizzaType(): void {
    if (!this.pizzaType.pizzaTypeCode || !this.pizzaType.name || !this.pizzaType.category) {
      Swal.fire('Validation', 'All fields are required.', 'warning');
      return;
    }

    this.loading = true;
    this.pizzaTypesService.add(this.pizzaType).subscribe({
      next: () => {
        Swal.fire('Success', 'Pizza type added!', 'success');
        this.router.navigate(['/pizza-types']);
      },
      error: () => {
        Swal.fire('Error', 'Could not add pizza type.', 'error');
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/pizza-types']);
  }
}
