import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderItemsComponent } from './order-items.component';
import { By } from '@angular/platform-browser';
import { OrderWithItems, RedeemCode } from '../../shared/interfaces/order';
import { User } from '../../shared/interfaces/user';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OrderItems } from '../../shared/interfaces/order-items';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('OrderItemsComponent', () => {
  let component: OrderItemsComponent;
  let fixture: ComponentFixture<OrderItemsComponent>;
  let orderServiceMock: any;
  const mockOrderItems: OrderItems[] = [{
    oi_id: 1,
    item: {
      item_id: 1,
      name: 'Item 1',
      description: '',
      est_time: 0,
      dimensions: '',
      file_ref: '',
      material: '',
      image_url: '',
      cost: 0
    },
    job: {
      printer: { printer_id: 1, name: 'Printer 1' },
      start_date: new Date().toISOString(),
      status: {
        status: 'In Progress',
        status_id: 2
      },
      job_id: 6,
      item: {
        item_id: 1,
        name: 'Item 1',
        description: '',
        est_time: 0,
        dimensions: '',
        file_ref: '',
        material: '',
        image_url: '',
        cost: 0
      },
      end_date: null
    },
    order: {
      order_id: 0,
      orderDate: new Date(),
      user: {
        userId: null,
        email: '',
        billingAddress: '',
        role: null
      },
      redeemCode: null
    }
  }];

  beforeEach(async () => {
    orderServiceMock = jasmine.createSpyObj('OrderService', ['getOrderItemsByOrder']);
    orderServiceMock.getOrderItemsByOrder.and.returnValue(of(mockOrderItems));


    await TestBed.configureTestingModule({
      imports: [OrderItemsComponent, HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderItemsComponent);
    component = fixture.componentInstance;
    component.orderItems = mockOrderItems;
    component.order = mockOrderItems[0].order;
    component.API_URL = 'http://localhost:3000';
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle webcam on button click', () => {
    const toggleButton = fixture.debugElement.query(By.css('button.btn-primary'));
    component.toggleWebcam();
    fixture.detectChanges();
    expect(component.isWebcamOn).toBeTrue();

    const webcamImage = fixture.debugElement.query(By.css('img.img-thumbnail'));
    expect(webcamImage).not.toBeNull();
    expect(webcamImage.attributes['src']).toContain('http://localhost:3000/printer/webcam/1');

    
  });
});
