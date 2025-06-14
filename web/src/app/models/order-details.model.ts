import { Pizza } from './pizza.model';

export interface OrderDetail {
  id: number;              // Matches C# 'Id'
  orderId: number;         // FK to order
  pizzaCode: string;       // FK to pizza business code
  quantity: number;
  pizza?: Pizza;           // Populated on expanded GET
}
