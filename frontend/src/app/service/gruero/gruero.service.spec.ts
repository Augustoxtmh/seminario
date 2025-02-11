import { TestBed } from '@angular/core/testing';

import { GrueroService } from './gruero.service';

describe('GrueroService', () => {
  let service: GrueroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrueroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
