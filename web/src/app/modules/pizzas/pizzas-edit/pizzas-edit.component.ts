import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Pizza } from '../../../models/pizza.model';
import { PizzaType } from '../../../models/pizza-type.model';
import { PizzasService } from '../../../services/pizzas.service';
import { PizzaTypesService } from '../../../services/pizza-types.service';

@Component({
  selector: 'app-pizzas-edit',
  standalone: false,
  templateUrl: './pizzas-edit.component.html',
  styleUrls: ['./pizzas-edit.component.css']
})
export class PizzasEditComponent implements OnInit {
  pizza: Pizza | null = null;
  pizzaTypes: PizzaType[] = [];
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private pizzasService: PizzasService,
    private pizzaTypesService: PizzaTypesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading = true;
    const pizzaCode = this.route.snapshot.paramMap.get('pizzaCode')!;

    this.pizzaTypesService.getAll(1, 1000).subscribe({
      next: res => this.pizzaTypes = res.items,
      error: () => Swal.fire('Error', 'Could not load pizza types.', 'error')
    });

    this.pizzasService.getById(pizzaCode).subscribe({
      next: pizza => {
        this.pizza = pizza;
        this.loading = false;
      },
      error: () => {
        Swal.fire('Error', 'Could not load pizza.', 'error');
        this.loading = false;
        this.router.navigate(['/pizzas']);
      }
    });
  }

  savePizza(): void {
    if (!this.pizza) return;
    this.loading = true;

    this.pizzasService.update(this.pizza.pizzaCode, {
      ...this.pizza,
      pizzaTypeCode: this.pizza.pizzaTypeCode,
      pizzaType: undefined
    }).subscribe({
      next: () => {
        Swal.fire('Success', 'Pizza updated!', 'success');
        this.router.navigate(['/pizzas']);
      },
      error: () => {
        Swal.fire('Error', 'Could not update pizza.', 'error');
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/pizzas']);
  }
}
