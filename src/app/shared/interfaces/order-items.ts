import { Item } from "./item";
import { Job } from "./job";
import { Order } from "./order";

export interface OrderItems {
    oi_id: number,
    item: Item,
    job: Job,
    order: Order
}