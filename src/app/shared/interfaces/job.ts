import { Item } from "./item";
import { Printer } from "./printer";

/**
 * Interface representing the status of a job.
 */
interface Status {
  /** Unique identifier for the status. */
  status_id: number;

  /** Description of the status. */
  status: string;
}

/**
 * Interface representing a job.
 */
export interface Job {
  /** Unique identifier for the job. */
  job_id: number;

  /** The item associated with the job. */
  item: Item;

  /** The printer used for the job. */
  printer: Printer;

  /** The current status of the job. */
  status: Status;

  /** The start date of the job. */
  start_date: string;

  /** The end date of the job, or null if the job is not yet completed. */
  end_date: string | null;
}
