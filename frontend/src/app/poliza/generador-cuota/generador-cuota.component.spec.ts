import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneradorCuotaComponent } from './generador-cuota.component';

describe('GeneradorCuotaComponent', () => {
  let component: GeneradorCuotaComponent;
  let fixture: ComponentFixture<GeneradorCuotaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneradorCuotaComponent]
    });
    fixture = TestBed.createComponent(GeneradorCuotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
