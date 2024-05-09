import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RedeemCodeDashboardComponent } from './redeem-code-dashboard.component';
import { redeemCodeService } from '../shared/services/redeem-code.service';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { of } from 'rxjs';
import { RedeemCodes } from "../shared/interfaces/redeem-codes";

describe('RedeemCodeDashboardComponent', () => {
  let component: RedeemCodeDashboardComponent;
  let fixture: ComponentFixture<RedeemCodeDashboardComponent>;
  let mockRedeemCodeService: jasmine.SpyObj<redeemCodeService>;
  let mockRedeemCodes: RedeemCodes[] = [
    { rc_id: 1, rcCode: "CODE1", used: 0 },
    { rc_id: 2, rcCode: "CODE2", used: 1 }
  ];

  beforeEach(async () => {
    mockRedeemCodeService = jasmine.createSpyObj('redeemCodeService', [
      'getAllRedeemCodes',
      'loadAllRedeemCodes',
      'validateRedeemCode',
      'generateCode',
      'createRedeemCode',
      'deleteRedeemCode'
    ]);
    mockRedeemCodeService.validateRedeemCode.and.returnValue(of({
      success: "true",
      message: "Redeem code is active.",
      data: []
    }))
    mockRedeemCodeService.loadAllRedeemCodes.and.callFake(() => {
      mockRedeemCodeService.getAllRedeemCodes.and.returnValue(mockRedeemCodes);
      component.redeemCodes = mockRedeemCodes;
    });
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RedeemCodeDashboardComponent // Import the standalone component here
      ],
      providers: [
        { provide: redeemCodeService, useValue: mockRedeemCodeService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RedeemCodeDashboardComponent);
    component = fixture.componentInstance;



    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load redeem codes on init', () => {
    component.ngOnInit();
    expect(mockRedeemCodeService.loadAllRedeemCodes).toHaveBeenCalled();
    expect(component.redeemCodes).toEqual(mockRedeemCodes);
  });


  it('should handle redeem code validation', () => {
    component.validateCode('CODE1');
    expect(mockRedeemCodeService.validateRedeemCode).toHaveBeenCalledWith('CODE1');
    expect(component.validationMessage).toEqual('Redeem code is active.');
    expect(component.isValid).toBeTrue();
  });

});
