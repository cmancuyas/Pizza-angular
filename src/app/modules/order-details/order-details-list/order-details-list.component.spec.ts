import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailsList } from './order-details-list.component';

describe('OrderDetailsList', () => {
  let component: OrderDetailsList;
  let fixture: ComponentFixture<OrderDetailsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderDetailsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderDetailsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
