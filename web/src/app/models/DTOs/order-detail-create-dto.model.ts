export interface OrderDetailCreateDto {
  pizzaCode: string;       // FK to Pizza (business code)
  quantity: number;
}
