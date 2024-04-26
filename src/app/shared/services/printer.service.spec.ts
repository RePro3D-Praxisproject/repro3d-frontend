import { TestBed } from '@angular/core/testing';

import { PrinterService } from './printer.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('OrderService', () => {
  let service: PrinterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    }).compileComponents();
    service = TestBed.inject(PrinterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
