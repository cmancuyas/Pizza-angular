import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaTypesAddComponent } from './pizza-types-add.component';

describe('PizzaTypesAddComponent', () => {
  let component: PizzaTypesAddComponent;
  let fixture: ComponentFixture<PizzaTypesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PizzaTypesAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzaTypesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
