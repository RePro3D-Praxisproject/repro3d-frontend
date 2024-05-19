import { Item } from "./item";
import { User } from "./user";

export interface OrderResponse {
  success: string;
  message: string;
  data: Order[]
}

export interface Order {
  orderId: number;
  orderDate: Date;
  user: User;
  redeemCode: RedeemCode | null;
}

export interface OrderWithItems {
  orderId: number;
  orderDate: Date;
  user: User;
  redeemCode: RedeemCode | null;
  items: Item[];
}

export interface RedeemCode {
  rc_id: number,
  rcCode: string,
  used: boolean
}