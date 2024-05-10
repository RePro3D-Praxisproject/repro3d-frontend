
import { User } from "./user";


export interface Order {
  order_id: number;
  orderDate: Date;
  user: User;
  redeemCode: string;
  status: string;
}

export interface Receipt {
  receiptId: number;
  paidOn: string;
  sumTotal: number;
  order: Order; // Embedding Order details directly within Receipt
}

export interface ReceiptResponse {
  success: boolean;
  message: string;
  data: Receipt[];
}
