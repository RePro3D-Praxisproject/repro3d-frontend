import { Item } from "./item";
import { Job } from "./job";
import { Order } from "./order";

/**
 * Interface representing an order item.
 * Combines an item, job, and order to represent a specific item within an order.
 */
export interface OrderItems {
  /** Unique identifier for the order item. */
  oi_id: number;

  /** The item associated with the order. */
  item: Item;

  /** The job associated with the order item. */
  job: Job;

  /** The order that includes this item. */
  order: Order;
}
