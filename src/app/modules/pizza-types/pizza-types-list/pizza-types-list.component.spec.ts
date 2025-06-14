import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaTypesListComponent } from './pizza-types-list.component';

describe('PizzaTypesListComponent', () => {
  let component: PizzaTypesListComponent;
  let fixture: ComponentFixture<PizzaTypesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PizzaTypesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzaTypesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
