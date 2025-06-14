import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzasUploadComponent } from './pizzas-upload.component';

describe('PizzasUploadComponent', () => {
  let component: PizzasUploadComponent;
  let fixture: ComponentFixture<PizzasUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PizzasUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzasUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
