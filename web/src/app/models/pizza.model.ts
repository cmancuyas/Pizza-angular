import { PizzaType } from './pizza-type.model';

export interface Pizza {
  id: number;
  pizzaCode: string;
  pizzaTypeCode: string;
  size: string;
  price: number;
  pizzaType?: PizzaType;
}
