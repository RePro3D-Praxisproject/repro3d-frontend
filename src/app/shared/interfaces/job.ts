import { Item } from "./item"
import { Printer } from "./printer"

export interface Job {
    job_id: 6,
    item: Item,
    printer: Printer,
    status: Status,
    start_date: string,
    end_date: string | null,
}

interface Status {
    status_id: number,
    status: string,
}