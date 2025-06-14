interface OrderDetailUpdateDto {
  pizzaCode: string;
  quantity: number;
}
export interface OrderUpdateDto {
  date: string;
  time: string;
  orderDetails: {
    pizzaCode: string;
    quantity: number;
  }[];
}
