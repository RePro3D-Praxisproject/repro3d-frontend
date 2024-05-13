import {ComponentFixture, TestBed} from '@angular/core/testing';
import { RedeemCodeDashboardComponent } from './redeem-code-dashboard.component';
import { BillingService } from '../shared/services/billing.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgClass, NgForOf, NgIf, SlicePipe } from "@angular/common";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('RedeemCodeDashboardComponent', () => {
  let component: RedeemCodeDashboardComponent;
  let fixture: ComponentFixture<RedeemCodeDashboardComponent>;
  let mockBillingService: jasmine.SpyObj<BillingService>;

  beforeEach(async () => {
    // Create a spy object for BillingService with stubbed methods
    mockBillingService = jasmine.createSpyObj('BillingService', ['loadAllRedeemCodes'], {
      itemsPerPage: 10,
      currentPage: 1
    });

    await TestBed.configureTestingModule({
      imports: [
        NgForOf, NgIf, SlicePipe, FormsModule, ReactiveFormsModule, NgClass,
        RedeemCodeDashboardComponent, HttpClientTestingModule,
      ],
      providers: [
        { provide: BillingService, useValue: mockBillingService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RedeemCodeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadAllRedeemCodes on initialization', () => {
    expect(mockBillingService.loadAllRedeemCodes).toHaveBeenCalled();
  });


});
