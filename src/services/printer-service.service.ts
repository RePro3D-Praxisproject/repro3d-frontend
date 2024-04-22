import {Injectable} from '@angular/core';
//import {HttpClient} from "@angular/common/http";
//import {Observable, of} from "rxjs";
import {Printer} from "../interfaces/printer";


@Injectable({
  providedIn: 'root',
})
export class PrinterService  {
 //private apiUrl = 'http://localhost:8080/printer';
  public printers: Printer[] = [
    { printer_id: 1, name: "Printer One", location: "Office", apikey: "123abc", ip_addr: "192.168.1.1" },
    { printer_id: 2, name: "Printer Two", location: "Lab", apikey: "456def", ip_addr: "192.168.1.2" },
    { printer_id: 3, name: "Printer Three", location: "Home Office", apikey: "789ghi", ip_addr: "192.168.1.3" },
  ];

/*

  public createPrinter(printer: Printer): Observable<any> {
    return this.http.post(`${this.apiUrl}`, printer);
  }

  public getAllPrinters(): Observable<Printer[]> {
    return of(this.printers);
  }

  public getPrinterById(id: number): Observable<Printer> {
    return this.http.get<Printer>(`${this.apiUrl}/${id}`);
  }

  public updatePrinter(id: number | undefined, printer: Printer): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, printer);
  }

  public deletePrinter(id: number | undefined): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
*/



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
  }
}
