import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailsUpload } from './order-details-upload.component';

describe('OrderDetailsUpload', () => {
  let component: OrderDetailsUpload;
  let fixture: ComponentFixture<OrderDetailsUpload>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderDetailsUpload]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderDetailsUpload);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
