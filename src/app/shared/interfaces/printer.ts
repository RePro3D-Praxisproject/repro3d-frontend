export class Printer {
  printer_id?: number;
  name?: string | undefined;
  location?: string;
  ip_addr?: string;
  apikey?: string;
}

export interface PrinterResponse {
  success: string;
  message: string;
  data: Printer[]
}