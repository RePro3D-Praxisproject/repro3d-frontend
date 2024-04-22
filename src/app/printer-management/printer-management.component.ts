import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {PrinterService} from "../../services/printer-service.service";
import {Printer} from "../../interfaces/printer";
import {FormsModule} from "@angular/forms";




@Component({
  selector: 'app-printer-management',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule,
    NgStyle
  ],
  templateUrl: './printer-management.component.html',
  styleUrls: ['./printer-management.component.scss']
})
export class PrinterManagementComponent implements OnInit{
  printers: Printer[] = [];
  isModalOpen: boolean = false;
  currentPrinter: Printer = new Printer();

  constructor(private printerService: PrinterService) {

  }


  toggleModal(open: boolean): void {
    this.isModalOpen = open;
  }
/*
  loadAllPrinters(): void {
    this.printerService.getAllPrinters().subscribe({
      next: (printers) => {
        this.printers = printers;
        console.log('Printers loaded:', printers);
      },
      error: (err) => console.error('Failed to load printers', err)
    });
  }
  addPrinter(): void {
    this.printerService.createPrinter(this.currentPrinter).subscribe({
      next: () => {
        this.loadAllPrinters();
        this.toggleModal(false);
        this.currentPrinter = new Printer();  // Reset after adding
      },
      error: (err) => console.error('Error adding printer', err)
    });
  }

  updatePrinter(): void {
    this.printerService.updatePrinter(this.currentPrinter.printer_id, this.currentPrinter).subscribe({
      next: () => {
        this.loadAllPrinters();
        this.toggleModal(false);
      },
      error: (err) => console.error('Error updating printer', err)
    });
  }

  deletePrinter(id: number | undefined): void {
    this.printerService.deletePrinter(id).subscribe({
      next: () => this.loadAllPrinters(),
      error: (err) => console.error('Error deleting printer', err)
    });
  }

  onEditPrinter(printer: Printer): void {
    this.currentPrinter = { ...printer };
    this.toggleModal(true);
  }*/

  ngOnInit(): void {
    this.loadAllPrinters();

  }

  loadAllPrinters(): void {
    this.printers = this.printerService.getAllPrinters();
  }

  addPrinter(printer: Printer): void {
    this.printerService.createPrinter(printer);
    this.loadAllPrinters();
  }

  updatePrinter(printer: Printer): void {
    this.printerService.updatePrinter(printer);
    this.loadAllPrinters();
  }

  deletePrinter(id: number | undefined): void {
    this.printerService.deletePrinter(id);
    this.loadAllPrinters();
  }

  onEditPrinter(printer: Printer) {

  }
}
