import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrinterManagementComponent } from './printer-management.component';
import { PrinterService } from '../../services/printer-service.service';
import { Printer } from '../../interfaces/printer';
import { FormsModule } from '@angular/forms';
import {of} from "rxjs";

describe('PrinterManagementComponent', () => {
  let component: PrinterManagementComponent;
  let fixture: ComponentFixture<PrinterManagementComponent>;
  let printerServiceMock: any;
  const mockPrinters: Printer[] = [
    { printer_id: 1, name: 'Printer One', location: 'Office', ip_addr: '192.168.1.1', apikey: 'key1' },
    { printer_id: 2, name: 'Printer Two', location: 'Lab', ip_addr: '192.168.1.2', apikey: 'key2' }
  ];

  beforeEach(() => {
    printerServiceMock = jasmine.createSpyObj<PrinterService>('PrinterService', ['getAllPrinters', 'createPrinter', 'updatePrinter', 'deletePrinter']);
    printerServiceMock.getAllPrinters.and.returnValue(mockPrinters); // Return mock printers synchronously

    TestBed.configureTestingModule({
      imports: [FormsModule],
      providers: [{ provide: PrinterService, useValue: printerServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(PrinterManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load printers on initialization', () => {
    expect(printerServiceMock.getAllPrinters).toHaveBeenCalled();
    expect(component.printers).toEqual(mockPrinters);
  });
  it('should open and close the modal for adding a printer', () => {
    expect(component.isModalOpen).toBeFalse();
    component.onAddPrinter();
    expect(component.isModalOpen).toBeTrue();
    component.toggleModal(false);
    expect(component.isModalOpen).toBeFalse();
  });

  it('should add a printer when submitted', () => {
    const newPrinter: Printer = { printer_id: 3, name: 'Printer Three', location: 'Home Office', ip_addr: '192.168.1.3', apikey: 'key3' };
    printerServiceMock.createPrinter.and.returnValue(of(newPrinter));
    component.addPrinter(newPrinter);
    expect(printerServiceMock.createPrinter).toHaveBeenCalledWith(newPrinter);
    // Assume loadAllPrinters works correctly so the new printer would be in the list
  });

  it('should call update on an existing printer', () => {
    const updatedPrinter = { ...mockPrinters[0], name: 'Updated Printer One' };
    component.updatePrinter(updatedPrinter);
    expect(printerServiceMock.updatePrinter).toHaveBeenCalledWith(updatedPrinter);
  });

  it('should delete a printer', () => {
    const printerId = mockPrinters[0].printer_id;
    component.confirmDelete(printerId);
    expect(printerServiceMock.deletePrinter).toHaveBeenCalledWith(printerId);
  });
});
