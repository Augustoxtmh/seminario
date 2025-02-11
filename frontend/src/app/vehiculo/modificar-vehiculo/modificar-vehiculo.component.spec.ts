import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarVehiculoComponent } from './modificar-vehiculo.component';

describe('ModificarVehiculoComponent', () => {
  let component: ModificarVehiculoComponent;
  let fixture: ComponentFixture<ModificarVehiculoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarVehiculoComponent]
    });
    fixture = TestBed.createComponent(ModificarVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
