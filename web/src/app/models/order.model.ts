import { OrderDetail } from './order-details.model';

export interface Order {
  id: number;
  date: string;
  time: string;
  orderDetails: OrderDetail[];
}
