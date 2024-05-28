import { Item } from "./item";
import { User } from "./user";

/**
 * Interface representing the response from an API that fetches orders.
 */
export interface OrderResponse {
  /** Indicates whether the request was successful. */
  success: string;

  /** Message providing additional information about the response. */
  message: string;

  /** Array of orders returned by the API. */
  data: Order[];
}

/**
 * Interface representing an order.
 */
export interface Order {
  /** Unique identifier for the order. */
  orderId: number;

  /** The date the order was placed. */
  orderDate: Date;

  /** The user who placed the order. */
  user: User;

  /** The redeem code used for the order, if any. */
  redeemCode: RedeemCode | null;
}

/**
 * Interface representing an order with its associated items.
 */
export interface OrderWithItems {
  /** Unique identifier for the order. */
  orderId: number;

  /** The date the order was placed. */
  orderDate: Date;

  /** The user who placed the order. */
  user: User;

  /** The redeem code used for the order, if any. */
  redeemCode: RedeemCode | null;

  /** Array of items included in the order. */
  items: Item[];
}

/**
 * Interface representing a redeem code.
 */
export interface RedeemCode {
  /** Unique identifier for the redeem code. */
  rc_id: number;

  /** The redeem code string. */
  rcCode: string;

  /** Indicates whether the redeem code has been used. */
  used: boolean;
}
