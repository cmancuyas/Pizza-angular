import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Pizza } from '../../../models/pizza.model';
import { PizzaType } from '../../../models/pizza-type.model';
import { PizzasService } from '../../../services/pizzas.service';
import { PizzaTypesService } from '../../../services/pizza-types.service';

@Component({
  selector: 'app-pizzas-add',
  standalone: false,
  templateUrl: './pizzas-add.component.html',
  styleUrls: ['./pizzas-add.component.css'],
})
export class PizzasAddComponent implements OnInit {
  pizza: Pizza = {
    id: 0,
    pizzaCode: '',         // e.g. "bbq_ckn_s"
    pizzaTypeCode: '',     // e.g. "bbq_ckn"
    size: '',
    price: 0,
  };

  pizzaTypes: PizzaType[] = [];
  loading = false;

  constructor(
    private pizzasService: PizzasService,
    private pizzaTypesService: PizzaTypesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pizzaTypesService.getAll(1, 100).subscribe({
      next: (res) => (this.pizzaTypes = res.items),
      error: () => {
        Swal.fire('Error', 'Could not load pizza types.', 'error');
      },
    });
  }

  savePizza(): void {
    if (!this.pizza.pizzaCode || !this.pizza.pizzaTypeCode || !this.pizza.size) {
      Swal.fire('Validation', 'All fields are required.', 'warning');
      return;
    }

    this.loading = true;
    this.pizzasService
      .add({
        ...this.pizza,
        pizzaType: undefined // remove nested object
      })
      .subscribe({
        next: () => {
          Swal.fire('Success', 'Pizza added!', 'success');
          this.router.navigate(['/pizzas']);
        },
        error: () => {
          Swal.fire('Error', 'Could not add pizza.', 'error');
          this.loading = false;
        },
      });
  }

  goBack(): void {
    this.router.navigate(['/pizzas']);
  }
}
