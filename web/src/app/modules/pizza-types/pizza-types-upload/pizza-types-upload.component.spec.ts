import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaTypesUploadComponent } from './pizza-types-upload.component';

describe('PizzaTypesUploadComponent', () => {
  let component: PizzaTypesUploadComponent;
  let fixture: ComponentFixture<PizzaTypesUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PizzaTypesUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzaTypesUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
