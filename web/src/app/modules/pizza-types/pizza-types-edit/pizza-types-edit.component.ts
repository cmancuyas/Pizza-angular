import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PizzaType } from '../../../models/pizza-type.model';
import { PizzaTypesService } from '../../../services/pizza-types.service';

@Component({
  selector: 'app-pizza-types-edit',
  standalone: false,
  templateUrl: './pizza-types-edit.component.html',
  styleUrls: ['./pizza-types-edit.component.css'],
})
export class PizzaTypesEditComponent implements OnInit {
  pizzaType: PizzaType = {
    id: 0,
    pizzaTypeCode: '', // ✅ updated
    name: '',
    category: '',
    ingredients: '',
  };
  loading = false;

  constructor(
    private pizzaTypesService: PizzaTypesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const pizzaTypeCode = this.route.snapshot.paramMap.get('pizzaTypeCode'); // ✅ was 'id'
    if (pizzaTypeCode) {
      this.loading = true;
      this.pizzaTypesService.getById(pizzaTypeCode).subscribe({
        next: (data) => {
          this.pizzaType = data;
          this.loading = false;
        },
        error: () => {
          Swal.fire('Error', 'Pizza type not found.', 'error');
          this.router.navigate(['/pizza-types']);
        },
      });
    }
  }

  savePizzaType(): void {
    this.loading = true;
    this.pizzaTypesService
      .update(this.pizzaType.pizzaTypeCode, this.pizzaType)
      .subscribe({
        next: () => {
          Swal.fire('Success', 'Pizza type updated!', 'success');
          this.router.navigate(['/pizza-types']);
        },
        error: () => {
          Swal.fire('Error', 'Could not update pizza type.', 'error');
          this.loading = false;
        },
      });
  }

  goBack(): void {
    this.router.navigate(['/pizza-types']);
  }
}
