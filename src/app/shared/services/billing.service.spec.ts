import { TestBed } from '@angular/core/testing';

import { BillingService } from './billing.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('BillingService', () => {
  let service: BillingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    }).compileComponents();
    service = TestBed.inject(BillingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
