import { OrderDetailCreateDto } from "./order-detail-create-dto.model";

export interface OrderCreateDto {
  date: string;
  time: string;
  orderDetails: OrderDetailCreateDto[];
}
