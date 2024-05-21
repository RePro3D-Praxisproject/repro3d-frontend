import { Component, OnInit } from '@angular/core';
import { NgForOf, NgIf, NgStyle } from "@angular/common";
import { PrinterService } from "../shared/services/printer.service";
import { Printer } from "../shared/interfaces/printer";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";

/**
 * Component for managing printers.
 * Allows adding, editing, and deleting printers, and displays a list of all printers.
 */
@Component({
  selector: 'app-printer-management',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    NgStyle
  ],
  templateUrl: './printer-management.component.html',
  styleUrls: ['./printer-management.component.scss']
})
export class PrinterManagementComponent implements OnInit {

  /** List of printers */
  printers: Printer[] = [];
  
  /** Flag to indicate if the add/edit modal is open */
  isModalOpen: boolean = false;

  /** Flag to indicate if the delete confirmation modal is open */
  isDeleteModalOpen: boolean = false;

  /** The currently selected printer for editing */
  currentPrinter: Printer = new Printer();

  /** The ID of the currently selected printer for editing or deletion */
  currentPrinterId: number | undefined;

  /** Error message for form validation */
  errorMsg = "";

  /** Form group for the printer form */
  public printerFormGroup: FormGroup;

  /**
   * Constructs the PrinterManagementComponent.
   * 
   * @param {PrinterService} printerService - The service to manage printer operations.
   * @param {FormBuilder} formBuilder - The form builder for creating forms.
   */
  constructor(public printerService: PrinterService, public readonly formBuilder: FormBuilder) {
    this.printerFormGroup = this.formBuilder.group({
      printerName: ['', [Validators.required]],
      ipAddress: ['', [Validators.required, 
        Validators.pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)')]],
      apiKey: ['', [Validators.required]]
    });
  }

  /**
   * Submits the printer form.
   * Adds or updates a printer based on the current state.
   */
  onSubmit() {
    if (!this.printerFormGroup.invalid) {
      const printer: Printer = {
        name: this.printerFormGroup.getRawValue()['printerName'],
        ip_addr: this.printerFormGroup.getRawValue()['ipAddress'],
        apikey: this.printerFormGroup.getRawValue()['apiKey'],
      };
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

  /**
   * Toggles the add/edit modal.
   * 
   * @param {boolean} open - True to open the modal, false to close it.
   */
  toggleModal(open: boolean): void {
    this.isModalOpen = open;
  }

  /**
   * Opens the edit modal with the selected printer's details.
   * 
   * @param {Printer} printer - The printer to edit.
   */
  onEditPrinter(printer: Printer) {
    this.printerFormGroup = this.formBuilder.group({
      printerName: [printer.name, [Validators.required]],
      ipAddress: [printer.ip_addr, [Validators.required, 
        Validators.pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)')]],
      apiKey: [printer.apikey, [Validators.required]]
    });
    this.currentPrinterId = printer.printer_id;
    this.toggleModal(true);
  }

  /**
   * Initializes the component.
   * Loads all printers on component initialization.
   */
  ngOnInit(): void {
    this.printerService.loadAllPrinters();
  }

  /**
   * Adds a new printer.
   * 
   * @param {Printer} printer - The printer to add.
   */
  addPrinter(printer: Printer) {
    this.printerService.createPrinter(printer);
    this.toggleModal(false);
  }

  /**
   * Updates an existing printer.
   * 
   * @param {Printer} printer - The printer to update.
   */
  updatePrinter(printer: Printer) {
    this.printerService.updatePrinter(printer.printer_id, printer);
    this.toggleModal(false);
  }

  /**
   * Opens the delete confirmation modal.
   * 
   * @param {number | undefined} id - The ID of the printer to delete.
   */
  onDeletePrinter(id: number | undefined) {
    this.currentPrinterId = id;
    this.toggleDeleteModal(true);
  }

  /**
   * Toggles the delete confirmation modal.
   * 
   * @param {boolean} open - True to open the modal, false to close it.
   */
  toggleDeleteModal(open: boolean) {
    this.isDeleteModalOpen = open;
  }

  /**
   * Confirms the deletion of the selected printer.
   * 
   * @param {number | undefined} id - The ID of the printer to delete.
   */
  confirmDelete(id: number | undefined) {
    this.printerService.deletePrinter(id);
    this.toggleDeleteModal(false);
  }

  /**
   * Opens the add printer modal with an empty form.
   */
  onAddPrinter(): void {
    this.printerFormGroup = this.formBuilder.group({
      printerName: ['', [Validators.required]],
      ipAddress: ['', [Validators.required, 
        Validators.pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)')]],
      apiKey: ['', [Validators.required]]
    });
    this.currentPrinterId = undefined;
    this.currentPrinter = new Printer();  // Reset currentPrinter for a new entry
    this.toggleModal(true);
  }
}
