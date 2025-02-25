import { TestBed } from '@angular/core/testing';

import { PgruaService } from './pgrua.service';

describe('PgruaService', () => {
  let service: PgruaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PgruaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
