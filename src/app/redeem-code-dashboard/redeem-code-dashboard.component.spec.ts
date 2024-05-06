import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RedeemCodeDashboardComponent } from './redeem-code-dashboard.component';
import { redeemCodeService } from '../shared/services/redeem-code.service';
import {of, throwError} from 'rxjs';
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('RedeemCodeDashboardComponent', () => {
  let component: RedeemCodeDashboardComponent;
  let fixture: ComponentFixture<RedeemCodeDashboardComponent>;
  let mockRedeemCodeService: jasmine.SpyObj<redeemCodeService>;

  beforeEach(async () => {
    mockRedeemCodeService = jasmine.createSpyObj('redeemCodeService', {
      'loadAllRedeemCodes': of([{ rc_code: "123xyz", rc_id: 12, used: 0 }]),
      'validateRedeemCode': of(true),
      'generateRedeemCode': of(null),
      'deleteRedeemCode': of(null)
    });

    await TestBed.configureTestingModule({
      imports: [
        RedeemCodeDashboardComponent,
        HttpClientTestingModule
      ],
      providers: [{ provide: redeemCodeService, useValue: mockRedeemCodeService }]
    }).compileComponents();

    fixture = TestBed.createComponent(RedeemCodeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(' it should generate', () => {
    expect(component).toBeTruthy();
  });

  it('should validate redeem code', () => {
    const spy = spyOn(window, 'alert');
    component.validateCode('123xyz');
    expect(mockRedeemCodeService.validateRedeemCode).toHaveBeenCalledWith('123xyz');
    expect(spy).toHaveBeenCalledWith('Redeem code is valid');
  });



  it('should delete a redeem code', () => {
    component.deleteCode(12);
    expect(mockRedeemCodeService.deleteRedeemCode).toHaveBeenCalledWith(12);
  })


});
