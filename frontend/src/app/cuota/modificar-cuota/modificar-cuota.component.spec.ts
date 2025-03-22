import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarCuotaComponent } from './modificar-cuota.component';

describe('ModificarCuotaComponent', () => {
  let component: ModificarCuotaComponent;
  let fixture: ComponentFixture<ModificarCuotaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarCuotaComponent]
    });
    fixture = TestBed.createComponent(ModificarCuotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
