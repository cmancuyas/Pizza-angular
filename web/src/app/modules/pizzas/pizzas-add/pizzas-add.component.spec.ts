import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzasAddComponent } from './pizzas-add.component';

describe('PizzasAddComponent', () => {
  let component: PizzasAddComponent;
  let fixture: ComponentFixture<PizzasAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PizzasAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzasAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
