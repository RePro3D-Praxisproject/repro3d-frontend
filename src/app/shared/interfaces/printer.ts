/**
 * Class representing a printer.
 */
export class Printer {
  /** Unique identifier for the printer. */
  printer_id?: number;

  /** Name of the printer. */
  name?: string | undefined;

  /** Location of the printer. */
  location?: string;

  /** IP address of the printer. */
  ip_addr?: string;

  /** API key for accessing the printer. */
  apikey?: string;
}

/**
 * Interface representing the response from an API that fetches printers.
 */
export interface PrinterResponse {
  /** Indicates whether the request was successful. */
  success: string;

  /** Message providing additional information about the response. */
  message: string;

  /** Array of printers returned by the API. */
  data: Printer[];
}
