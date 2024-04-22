import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";



@Injectable({
  providedIn: 'root',
})
export class PrinterService {
  constructor(private http: HttpClient) { }



  public createPrinter(){

  }

  public getAllPrinters(){

  }

  public getPrinterById(id: number){

  }

  public deletePrinter(id: number){

  }

  public updatePrinter(id:number){

  }
}
