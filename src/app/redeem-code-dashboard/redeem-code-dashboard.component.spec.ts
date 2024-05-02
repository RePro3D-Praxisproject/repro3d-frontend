import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedeemcodeDashboardComponent } from './redeem-code-dashboard.component';

describe('RedeemcodeDashboardComponent', () => {
  let component: RedeemcodeDashboardComponent;
  let fixture: ComponentFixture<RedeemcodeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RedeemcodeDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedeemcodeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
