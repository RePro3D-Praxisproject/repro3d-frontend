import {Injectable} from '@angular/core';
//import {HttpClient} from "@angular/common/http";
//import {Observable, of} from "rxjs";
import {Printer, PrinterResponse} from "../interfaces/printer";
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class PrinterService {

  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:8070/printer';
  public printers: Printer[] = [];



  public createPrinter(printer: Printer): void {
    this.http.post(`${this.apiUrl}`, printer).subscribe(
      _ => {
        this.loadAllPrinters();
      }
    );
  }

  public getAllPrinters(): Printer[] {
    return this.printers;
  }

  public loadAllPrinters(): void {
    this.http.get<PrinterResponse>(`${this.apiUrl}`).subscribe(
      printers =>  {
        this.printers = printers.data;
        console.log(this.printers)
      }
    )
  }

  public getPrinterById(id: number): Observable<Printer> {
    return this.http.get<Printer>(`${this.apiUrl}/${id}`);
  }

  public updatePrinter(id: number | undefined, printer: Printer) {
    this.http.put(`${this.apiUrl}/${id}`, printer).subscribe(
      _ => {
        this.loadAllPrinters();
      }
    );
  }

  public deletePrinter(id: number | undefined): void {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(
      _ => {
        this.loadAllPrinters();
      }
    );
  }



/* 
  public createPrinter(newPrinter: Printer): void {
    newPrinter.printer_id = this.printers.length + 1;
    this.printers.push(newPrinter);
  }

  public getAllPrinters(): Printer[] {
    return this.printers;
  }

  public getPrinterById(id: number): Printer | undefined {
    return this.printers.find(printer => printer.printer_id === id);
  }

  public updatePrinter(updatedPrinter: Printer): void {
    const index = this.printers.findIndex(p => p.printer_id === updatedPrinter.printer_id);
    if (index !== -1) {
      this.printers[index] = updatedPrinter;
    }
  }

  public deletePrinter(id: number | undefined): void {
    const index = this.printers.findIndex(printer => printer.printer_id === id);
    if (index > -1) {
      this.printers.splice(index, 1);
    }
  } */
}
