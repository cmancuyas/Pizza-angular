import { TestBed } from '@angular/core/testing';

import { PizzaTypesService } from './pizza-types.service';

describe('PizzaTypes', () => {
  let service: PizzaTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PizzaTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
