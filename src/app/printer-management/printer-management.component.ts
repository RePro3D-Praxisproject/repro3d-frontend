import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {PrinterService} from "../shared/services/printer.service";
import {Printer} from "../shared/interfaces/printer";
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
  isDeleteModalOpen: boolean = false;
  currentPrinter: Printer = new Printer();
  currentPrinterId: number | undefined;

  constructor(public printerService: PrinterService) {

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

  onEditPrinter(printer: Printer) {
    this.currentPrinter = { ...printer };
    this.toggleModal(true);
  }
  ngOnInit(): void {
    this.printerService.loadAllPrinters();
    this.printers = this.printerService.getAllPrinters()
  }

  addPrinter(printer: Printer) {
    this.printerService.createPrinter(printer);
    this.toggleModal(false);
  }

  updatePrinter(printer: Printer) {
    this.printerService.updatePrinter(printer.printer_id, printer);
    this.toggleModal(false);
  }

  onDeletePrinter(id: number | undefined) {
    this.currentPrinterId = id;
    this.toggleDeleteModal(true);
  }

  toggleDeleteModal(open: boolean) {
    this.isDeleteModalOpen = open;
  }

  confirmDelete(id: number | undefined) {
    this.printerService.deletePrinter(id);
    this.toggleDeleteModal(false);
  }
  onAddPrinter(): void {
    this.currentPrinter = new Printer();  // Reset currentPrinter for a new entry
    this.toggleModal(true);
  }

}
