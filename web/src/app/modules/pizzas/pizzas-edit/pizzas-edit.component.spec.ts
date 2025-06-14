import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzasEditComponent } from './pizzas-edit.component';

describe('PizzasEditComponent', () => {
  let component: PizzasEditComponent;
  let fixture: ComponentFixture<PizzasEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PizzasEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzasEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
