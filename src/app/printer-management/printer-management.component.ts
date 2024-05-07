import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {PrinterService} from "../shared/services/printer.service";
import {Printer} from "../shared/interfaces/printer";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";




@Component({
  selector: 'app-printer-management',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
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
  errorMsg = "";
  public printerFormGroup: FormGroup;

  constructor(public printerService: PrinterService, public readonly formBuilder: FormBuilder) {
    this.printerFormGroup = this.formBuilder.group({
      printerName: ['', [Validators.required]],
      ipAddress: ['', [Validators.required, 
        Validators.pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)')]],
      apiKey: ['', [Validators.required]]
    })
  }

  onSubmit() {
    if (!this.printerFormGroup.invalid) {
      const printer: Printer = {
        name: this.printerFormGroup.getRawValue()['printerName'],
        ip_addr: this.printerFormGroup.getRawValue()['ipAddress'],
        apikey: this.printerFormGroup.getRawValue()['apiKey'],
      }
      if (this.currentPrinterId) {
        printer.printer_id = this.currentPrinterId;
        this.updatePrinter(printer);
      } else {
        this.addPrinter(printer);
      }
    } else {
      switch ("INVALID") {
        case this.printerFormGroup.controls['printerName'].status:
          this.errorMsg = "Printer name is empty or invalid.";
          break;
        case this.printerFormGroup.controls['ipAddress'].status:
          this.errorMsg = "IP Address is invalid.";
          break;
        case this.printerFormGroup.controls['apiKey'].status:
          this.errorMsg = "API key is empty or invalid.";
          break;
      } 
    }
  }


  toggleModal(open: boolean): void {
    this.isModalOpen = open;
  }


  onEditPrinter(printer: Printer) {
    this.printerFormGroup = this.formBuilder.group({
      printerName: [printer.name, [Validators.required]],
      ipAddress: [printer.ip_addr, [Validators.required, 
        Validators.pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)')]],
      apiKey: [printer.apikey, [Validators.required]]
    })
    this.currentPrinterId = printer.printer_id;
    this.toggleModal(true);
  }
  ngOnInit(): void {
    this.printerService.loadAllPrinters();
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
    this.printerFormGroup = this.formBuilder.group({
      printerName: ['', [Validators.required]],
      ipAddress: ['', [Validators.required, 
        Validators.pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)')]],
      apiKey: ['', [Validators.required]]
    })
    this.currentPrinterId = undefined;
    this.currentPrinter = new Printer();  // Reset currentPrinter for a new entry
    this.toggleModal(true);
  }

}
