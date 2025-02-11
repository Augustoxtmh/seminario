import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarVehiculoComponent } from './agregar-vehiculo.component';

describe('AgregarVehiculoComponent', () => {
  let component: AgregarVehiculoComponent;
  let fixture: ComponentFixture<AgregarVehiculoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarVehiculoComponent]
    });
    fixture = TestBed.createComponent(AgregarVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
