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
