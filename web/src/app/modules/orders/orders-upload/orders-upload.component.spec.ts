import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersUpload } from './orders-upload.component';

describe('OrdersUpload', () => {
  let component: OrdersUpload;
  let fixture: ComponentFixture<OrdersUpload>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrdersUpload]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersUpload);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
