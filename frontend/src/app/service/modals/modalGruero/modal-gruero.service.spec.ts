import { TestBed } from '@angular/core/testing';

import { ModalGrueroService } from './modal-gruero.service';

describe('ModalGrueroService', () => {
  let service: ModalGrueroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalGrueroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
