import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PrinterManagementComponent } from './printer-management.component';
import { ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { PrinterService } from '../shared/services/printer.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { throwError } from 'rxjs';

describe('PrinterManagementComponent', () => {
  let component: PrinterManagementComponent;
  let fixture: ComponentFixture<PrinterManagementComponent>;
  let printerService: PrinterService;
  let mockPrinters = [
    { printer_id: 1, name: 'Printer A', ip_addr: '192.168.1.1', apikey: 'key1' },
    { printer_id: 2, name: 'Printer B', ip_addr: '192.168.1.2', apikey: 'key2' }
  ];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule, PrinterManagementComponent],
      providers: [PrinterService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrinterManagementComponent);
    component = fixture.componentInstance;
    printerService = TestBed.inject(PrinterService);
    spyOn(printerService, 'loadAllPrinters').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load printers on init', () => {
    expect(printerService.loadAllPrinters).toHaveBeenCalled();
  });

  it('should open modal to add printer', () => {
    component.onAddPrinter();
    expect(component.isModalOpen).toBeTrue();
    expect(component.currentPrinter).toEqual(jasmine.any(Object));
    fixture.detectChanges();
    const modalElement = fixture.debugElement.query(By.css('.modal')).nativeElement;
    expect(modalElement.style.display).toBe('block');
  });

  it('should close modal on toggleModal', () => {
    component.toggleModal(true);
    expect(component.isModalOpen).toBeTrue();
    component.toggleModal(false);
    expect(component.isModalOpen).toBeFalse();
  });

  it('should call updatePrinter on form submit with existing printer', fakeAsync(() => {
    component.currentPrinterId = 1; // Mock existing printer id
    component.printerFormGroup = component.formBuilder.group({
      printerName: ['Example Printer', [Validators.required]],
      ipAddress: ['10.1.1.10', [Validators.required, 
        Validators.pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)')]],
      apiKey: ['apikey1', [Validators.required]]
    })
    spyOn(component, 'updatePrinter').and.callThrough();
    component.onSubmit();
    tick();
    expect(component.updatePrinter).toHaveBeenCalled();
  }));

  it('should call addPrinter on form submit with new printer', fakeAsync(() => {
    component.currentPrinterId = undefined; // No existing printer
    component.printerFormGroup = component.formBuilder.group({
      printerName: ['Example Printer', [Validators.required]],
      ipAddress: ['10.1.1.10', [Validators.required, 
        Validators.pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)')]],
      apiKey: ['apikey1', [Validators.required]]
    })
    spyOn(component, 'addPrinter').and.callThrough();
    component.onSubmit();
    tick();
    expect(component.addPrinter).toHaveBeenCalled();
  }));

  it('should handle form errors', () => {
    component.printerFormGroup.controls['printerName'].setValue('');
    component.onSubmit();
    expect(component.errorMsg).toContain('Printer name is empty or invalid');
  });

  it('should close delete confirmation modal', () => {
    component.toggleDeleteModal(true);
    expect(component.isDeleteModalOpen).toBeTrue();
    component.toggleDeleteModal(false);
    expect(component.isDeleteModalOpen).toBeFalse();
  });

  it('should delete printer and refresh list', fakeAsync(() => {
    const testPrinterId = 123;
    spyOn(printerService, 'deletePrinter');
    component.confirmDelete(testPrinterId);
    tick();
    expect(printerService.deletePrinter).toHaveBeenCalledWith(testPrinterId);
    expect(printerService.loadAllPrinters).toHaveBeenCalled();
  }));
});
