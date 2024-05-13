import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebshopOfflineComponent } from './webshop-offline.component';

describe('WebshopOfflineComponent', () => {
  let component: WebshopOfflineComponent;
  let fixture: ComponentFixture<WebshopOfflineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebshopOfflineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WebshopOfflineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
