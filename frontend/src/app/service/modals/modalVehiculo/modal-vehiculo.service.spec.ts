import { TestBed } from '@angular/core/testing';

import { ModalVehiculoService } from './modal-vehiculo.service';

describe('ModalVehiculoService', () => {
  let service: ModalVehiculoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalVehiculoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
