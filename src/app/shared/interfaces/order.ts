import { User } from "./user";
import {RedeemCode} from "./redeem-codes";

export interface OrderResponse {
  success: string;
  message: string;
  data: Order[]
}

export interface Order {
  order_id: number;
  orderDate: Date;
  user: User;
  redeemCode: RedeemCode | null;
}


