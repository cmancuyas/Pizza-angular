import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaTypesEdit } from './pizza-types-edit.component';

describe('PizzaTypesEdit', () => {
  let component: PizzaTypesEdit;
  let fixture: ComponentFixture<PizzaTypesEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PizzaTypesEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzaTypesEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
