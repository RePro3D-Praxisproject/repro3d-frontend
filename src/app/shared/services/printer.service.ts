import {Injectable} from '@angular/core';
//import {HttpClient} from "@angular/common/http";
//import {Observable, of} from "rxjs";
import {Printer, PrinterResponse} from "../interfaces/printer";
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../constants/apiurl.constant';


@Injectable({
  providedIn: 'root',
})
export class PrinterService {

  constructor(private http: HttpClient) {}
  public printers: Printer[] = [];



  public createPrinter(printer: Printer): void {
    this.http.post(`${API_URL}/printer`, printer).subscribe(
      _ => {
        this.loadAllPrinters();
      }
    );
  }

  public getAllPrinters(): Printer[] {
    return this.printers;
  }

  public loadAllPrinters(): void {
    this.http.get<PrinterResponse>(`${API_URL}/printer`).subscribe(
      printers =>  {
        this.printers = printers.data;
        console.log(this.printers)
      }
    )
  }

  public getPrinterById(id: number): Observable<Printer> {
    return this.http.get<Printer>(`${API_URL}/printer/${id}`);
  }

  public updatePrinter(id: number | undefined, printer: Printer) {
    this.http.put(`${API_URL}/printer/${id}`, printer).subscribe(
      _ => {
        this.loadAllPrinters();
      }
    );
  }

  public deletePrinter(id: number | undefined): void {
    this.http.delete(`${API_URL}/printer/${id}`).subscribe(
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
