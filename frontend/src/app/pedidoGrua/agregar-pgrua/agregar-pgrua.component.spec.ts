import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPGruaComponent } from './agregar-pgrua.component';

describe('AgregarPGruaComponent', () => {
  let component: AgregarPGruaComponent;
  let fixture: ComponentFixture<AgregarPGruaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarPGruaComponent]
    });
    fixture = TestBed.createComponent(AgregarPGruaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
