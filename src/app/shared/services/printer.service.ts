import { Injectable } from '@angular/core';
import { Printer, PrinterResponse } from "../interfaces/printer";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../constants/apiurl.constant';
import { Job } from '../interfaces/job';

@Injectable({
  providedIn: 'root',
})
export class PrinterService {

  /** Array to hold the list of printers. */
  public printers: Printer[] = [];

  /**
   * Constructs the PrinterService.
   * 
   * @param {HttpClient} http - The HTTP client for making requests.
   */
  constructor(private http: HttpClient) {}

  /**
   * Creates a new printer.
   * 
   * @param {Printer} printer - The new printer to be created.
   */
  public createPrinter(printer: Printer): void {
    this.http.post(`${API_URL}/printer`, printer).subscribe(
      _ => {
        this.loadAllPrinters();
      }
    );
  }

  /**
   * Returns the list of all printers.
   * 
   * @returns {Printer[]} - Array of all printers.
   */
  public getAllPrinters(): Printer[] {
    return this.printers;
  }

  /**
   * Loads all printers from the API and updates the local array.
   */
  public loadAllPrinters(): void {
    this.http.get<PrinterResponse>(`${API_URL}/printer`).subscribe(
      printers => {
        this.printers = printers.data;
        console.log(this.printers);
      }
    );
  }

  /**
   * Retrieves a printer by its ID.
   * 
   * @param {number} id - The ID of the printer.
   * @returns {Observable<Printer>} - Observable containing the printer data.
   */
  public getPrinterById(id: number): Observable<Printer> {
    return this.http.get<Printer>(`${API_URL}/printer/${id}`);
  }

  /**
   * Updates an existing printer.
   * 
   * @param {number | undefined} id - The ID of the printer.
   * @param {Printer} printer - The updated printer data.
   */
  public updatePrinter(id: number | undefined, printer: Printer): void {
    this.http.put(`${API_URL}/printer/${id}`, printer).subscribe(
      _ => {
        this.loadAllPrinters();
      }
    );
  }

  /**
   * Deletes a printer by its ID.
   * 
   * @param {number | undefined} id - The ID of the printer.
   */
  public deletePrinter(id: number | undefined): void {
    this.http.delete(`${API_URL}/printer/${id}`).subscribe(
      _ => {
        this.loadAllPrinters();
      }
    );
  }

  /**
   * Updates a job by its ID.
   * 
   * @param {Job} job - The job.
   */
  public updateJob(job: Job) {
    this.http.put(`${API_URL}/job/mark-as-done/${job.job_id}`, job).subscribe(
      _ => {
        this.loadAllPrinters();
      }
    )
  }
}
